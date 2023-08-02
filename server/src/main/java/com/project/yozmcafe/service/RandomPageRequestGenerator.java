package com.project.yozmcafe.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class RandomPageRequestGenerator {

    private final SecureRandom secureRandom = new SecureRandom();

    public RandomPageRequestGenerator() {
    }

    public PageRequest getPageRequestWithCafeCount(final Long unViewedCafeCount, final int pageSize) {
        final int pageIdx = secureRandom.nextInt((int) Math.ceil((double) unViewedCafeCount / pageSize));
        return PageRequest.of(pageIdx, pageSize);
    }
}