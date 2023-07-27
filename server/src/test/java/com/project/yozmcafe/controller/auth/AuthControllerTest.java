package com.project.yozmcafe.controller.auth;

import com.project.yozmcafe.domain.member.Member;
import com.project.yozmcafe.domain.member.MemberRepository;
import com.project.yozmcafe.service.auth.GoogleOAuthClient;
import com.project.yozmcafe.service.auth.JwtTokenProvider;
import com.project.yozmcafe.service.auth.KakaoOAuthClient;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    @LocalServerPort
    int port;

    @SpyBean
    GoogleOAuthClient googleOAuthClient;
    @SpyBean
    KakaoOAuthClient kakaoOAuthClient;
    @MockBean
    MemberRepository memberRepository;
    @MockBean
    JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    @DisplayName("Provider Google OAuth login을 한다.")
    void loginWithGoogle() {
        //given
        doReturn(new MemberInfo("openId", "오션", "바다.img"))
                .when(googleOAuthClient).getUserInfo(anyString());

        given(memberRepository.findById(anyString()))
                .willReturn(Optional.of(new Member("openId", "오션", "바다.img")));

        //when
        final Response response = RestAssured.given()
                .log().all()
                .queryParam("code", "googleCode")
                .when()
                .post("/auth/{providerName}", "google");

        //then
        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(response.cookie("refreshToken")).isNotNull()
        );
    }

    @Test
    @DisplayName("Provider Kakao OAuth login을 한다.")
    void loginWithKakao() {
        //given
        doReturn(new MemberInfo("openId", "오션", "바다.img"))
                .when(kakaoOAuthClient).getUserInfo(anyString());

        given(memberRepository.findById(anyString()))
                .willReturn(Optional.of(new Member("openId", "오션", "바다.img")));

        //when
        final Response response = RestAssured.given()
                .log().all()
                .queryParam("code", "googleCode")
                .when()
                .post("/auth/{providerName}", "kakao");

        //then
        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(response.cookie("refreshToken")).isNotNull()
        );
    }

    @Test
    @DisplayName("토큰을 갱신한다.")
    void refreshToken() {
        //given
        given(jwtTokenProvider.refreshAccessToken(anyString(), anyString()))
                .willReturn("goodOceanAccessToken");

        //when
        final Response response = RestAssured.given().log().all()
                .header("Authorization", "goodOceanAccessToken")
                .cookie("refreshToken", "handSomeOceanRefreshToken")
                .when()
                .log().all()
                .get("/auth");

        //then
        assertAll(
                () -> assertThat(response.jsonPath().getString("token")).isEqualTo("goodOceanAccessToken"),
                () -> assertThat(response.cookie("refreshToken")).isNotNull()
        );
    }

    @Test
    @DisplayName("Provider 인증 주소를 반환한다.")
    void authorizationUrls() {
        //when
        final Response response = RestAssured.given().log().all()
                .when()
                .log().all()
                .get("/auth/urls");

        //then
        for (OAuthProvider provider : OAuthProvider.values()) {
            String providerPath = "[" + provider.ordinal() + "]" + ".provider";
            String urlPath = "[" + provider.ordinal() + "]" + ".authorizationUrl";

            assertThat(response.getBody().jsonPath().getString(providerPath)).isEqualTo(provider.name());
            assertThat(response.getBody().jsonPath().getString(urlPath))
                    .contains("response_type", "redirect_uri", "client_id", "scope");
        }
    }
}
