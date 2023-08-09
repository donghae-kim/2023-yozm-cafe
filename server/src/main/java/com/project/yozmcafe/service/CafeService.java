package com.project.yozmcafe.service;

import com.project.yozmcafe.controller.dto.cafe.CafeResponse;
import com.project.yozmcafe.domain.cafe.Cafe;
import com.project.yozmcafe.domain.cafe.CafeRepository;
import com.project.yozmcafe.domain.cafe.UnViewedCafe;
import com.project.yozmcafe.domain.member.Member;
import com.project.yozmcafe.exception.BadRequestException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.project.yozmcafe.exception.ErrorCode.NOT_EXISTED_CAFE;

@Service
@Transactional(readOnly = true)
public class CafeService {

    private final CafeRepository cafeRepository;
    private final UnViewedCafeService unViewedCafeService;

    public CafeService(final CafeRepository cafeRepository, final UnViewedCafeService unViewedCafeService) {
        this.cafeRepository = cafeRepository;
        this.unViewedCafeService = unViewedCafeService;
    }

    public List<CafeResponse> getCafesForUnLoginMember(final Pageable pageable) {
        final List<Cafe> foundCafes = cafeRepository.findSliceBy(pageable).getContent();

        return foundCafes.stream()
                .map(CafeResponse::fromUnLoggedInUser)
                .toList();
    }

    public CafeResponse getCafeById(long cafeId) {
        Cafe foundCafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new BadRequestException(NOT_EXISTED_CAFE));

        return CafeResponse.fromUnLoggedInUser(foundCafe);
    }

    @Transactional
    public List<CafeResponse> getCafesForLoginMember(final Member member, final int size) {
        final List<UnViewedCafe> cafes = member.getNextUnViewedCafes(size);
        unViewedCafeService.refillWhenUnViewedCafesSizeUnderTwenty(member);

        return cafes.stream()
                .map(UnViewedCafe::getCafe)
                .map(cafe -> CafeResponse.fromLoggedInUser(cafe, member.isLike(cafe)))
                .toList();
    }
}
