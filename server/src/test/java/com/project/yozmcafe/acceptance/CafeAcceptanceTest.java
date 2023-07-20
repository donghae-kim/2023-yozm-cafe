package com.project.yozmcafe.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.project.yozmcafe.domain.cafe.CafeRepository;
import com.project.yozmcafe.fixture.Fixture;
import com.project.yozmcafe.util.AcceptanceContext;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CafeAcceptanceTest {

    @LocalServerPort
    int port;

    @Autowired
    private AcceptanceContext context;

    @Autowired
    private CafeRepository cafeRepository;

    @BeforeEach
    void setUp() {
        cafeRepository.save(Fixture.getCafe("카페1", "주소1", 3));
        cafeRepository.save(Fixture.getCafe("카페2", "주소2", 4));
        cafeRepository.save(Fixture.getCafe("카페3", "주소3", 5));
        cafeRepository.save(Fixture.getCafe("카페4", "주소4", 6));
        cafeRepository.save(Fixture.getCafe("카페5", "주소5", 7));
        RestAssured.port = port;
    }

    @Test
    @DisplayName("로그인 되지 않은 사용자가 /cafes?page=? 에 GET요청을 보내면 페이지에 해당하는 카페 정보들을 응답한다.")
    void getCafesSuccessByUnLoginUser() {
        //when
        context.invokeHttpGet("/cafes?page=1");
        final ExtractableResponse<Response> response = context
                .response
                .then()
                .extract();

        //then
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.jsonPath().getList("$")).hasSize(5);
    }

    @Test
    @DisplayName("로그인 되지 않은 사용자가 /cafes?page=? 에 GET요청을 보낸 경우 page가 최대 page를 초과하는 경우 빈배열을 반환한다.")
    void getCafesEmptyByUnLoginUser() {
        //when
        context.invokeHttpGet("/cafes?page=2000");
        final ExtractableResponse<Response> response = context
                .response
                .then()
                .extract();

        //then
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.jsonPath().getList("$")).isEmpty();
    }
}
