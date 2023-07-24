package com.project.yozmcafe.domain.member;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.project.yozmcafe.domain.cafe.Cafe;
import com.project.yozmcafe.domain.cafe.UnViewedCafe;
import com.project.yozmcafe.fixture.Fixture;

class MemberTest {

    @Test
    @DisplayName("회원의 unViewedCafe 기록을 삭제한다.")
    void removeUnViewedCafe() {
        //given
        Member member = new Member("3", "폴로", "폴로사진");
        final Cafe cafe1 = Fixture.getCafe("카페1", "주소1", 3);
        final Cafe cafe2 = Fixture.getCafe("카페2", "주소2", 4);
        final Cafe cafe3 = Fixture.getCafe("카페3", "주소3", 5);
        member.addUnViewedCafes(List.of(cafe1, cafe2, cafe3));
        final UnViewedCafe unViewedCafe = member.getUnViewedCafes().get(0);

        //when
        member.removeUnViewedCafe(unViewedCafe);

        //then
        assertThat(member.getUnViewedCafes()).hasSize(2);
    }

    @Test
    @DisplayName("멤버의 unViewedCafes가 비어있으면 true를 반환한다.")
    void isEmptyUnViewedCafe() {
        //given
        final Member member = new Member("4", "폴로", "폴로사진");

        //when
        final boolean result = member.isEmptyUnViewedCafe();

        //then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("멤버의 좋아요 리스트에 포함된 카페면 true를 아니면 false를 반환한다.")
    void isLike() {
        //given
        final Member member = new Member("4", "폴로", "폴로사진");
        final Cafe cafe1 = Fixture.getCafe(1L, "카페1", "주소1", 10);
        final Cafe cafe2 = Fixture.getCafe(2L, "카페2", "주소2", 9);
        member.addLikedCafe(cafe1);

        //when
        final boolean result1 = member.isLike(cafe1);
        final boolean result2 = member.isLike(cafe2);

        //then
        Assertions.assertAll(
                () -> assertThat(result1).isTrue(),
                () -> assertThat(result2).isFalse()
        );
    }
}
