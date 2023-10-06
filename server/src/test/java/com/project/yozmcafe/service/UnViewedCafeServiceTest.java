package com.project.yozmcafe.service;

import com.project.yozmcafe.BaseTest;
import com.project.yozmcafe.domain.RandomCafeShuffleStrategy;
import com.project.yozmcafe.domain.cafe.Cafe;
import com.project.yozmcafe.domain.cafe.CafeRepository;
import com.project.yozmcafe.domain.member.Member;
import com.project.yozmcafe.domain.member.MemberRepository;
import com.project.yozmcafe.fixture.Fixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class UnViewedCafeServiceTest extends BaseTest {

    private UnViewedCafeService unViewedCafeService;

    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        unViewedCafeService = new UnViewedCafeService(cafeRepository, new RandomCafeShuffleStrategy());
    }

    @Test
    @DisplayName("사용자의 UnViewedCafe가 20개 미만일 때 모든 카페를 다시 채운다")
    void refillWhenUnViewedCafesSizeUnderTwenty() {
        //given
        final Member member = memberRepository.save(new Member("id", "연어", "image"));
        cafeRepository.save(Fixture.getCafe("cafe1", "address", 5));
        cafeRepository.save(Fixture.getCafe("cafe2", "address", 5));
        cafeRepository.save(Fixture.getCafe("cafe3", "address", 5));

        //when
        unViewedCafeService.refillWhenUnViewedCafesSizeUnderTwenty(member);

        //then
        final Member refilledMember = memberRepository.findWithUnViewedCafesById(member.getId()).get();
        assertThat(refilledMember.getUnViewedCafes()).hasSize(3);
    }

    @Test
    @DisplayName("사용자의 UnViewedCafe가 20개 이상이면 다시 채우지 않는다")
    void refillWhenUnViewedCafesSizeUnderTwenty2() {
        //given
        final Member member = memberRepository.save(new Member("id", "연어", "image"));

        final int initialUnViewedCafesSize = 20;
        final List<Cafe> allCafes = new ArrayList<>();
        for (int i = 0; i < initialUnViewedCafesSize; i++) {
            allCafes.add(Fixture.getCafe((long) i, "카페", "주소", 3));
        }
        final List<Cafe> savedAllCafes = cafeRepository.saveAll(allCafes);
        member.addUnViewedCafes(allCafes);
        cafeRepository.saveUnViewedCafes(savedAllCafes, member);

        //when
        unViewedCafeService.refillWhenUnViewedCafesSizeUnderTwenty(member);

        //then
        final Member refilledMember = memberRepository.findWithUnViewedCafesById(member.getId()).get();
        assertThat(refilledMember.getUnViewedCafes()).hasSize(initialUnViewedCafesSize);
    }
}
