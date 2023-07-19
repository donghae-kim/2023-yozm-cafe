package com.project.yozmcafe.domain.member;

import static com.project.yozmcafe.fixture.Fixture.CAFE_1;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.project.yozmcafe.domain.cafe.UnViewedCafe;

class MemberTest {

    @Test
    @DisplayName("회원의 unViewedCafe 기록을 삭제한다.")
    void removeUnViewedCafe() {
        //given
        Member member = new Member(1L);
        final UnViewedCafe unViewedCafe1 = new UnViewedCafe(null, CAFE_1, member);
        final UnViewedCafe unViewedCafe2 = new UnViewedCafe(null, CAFE_1, member);
        final UnViewedCafe unViewedCafe3 = new UnViewedCafe(null, CAFE_1, member);
        member.addUnViewedCafe(unViewedCafe1);
        member.addUnViewedCafe(unViewedCafe2);
        member.addUnViewedCafe(unViewedCafe3);

        //when
        member.removeUnViewedCafe(CAFE_1);

        //then
        assertThat(member.getUnViewedCafes()).hasSize(2);
    }

}
