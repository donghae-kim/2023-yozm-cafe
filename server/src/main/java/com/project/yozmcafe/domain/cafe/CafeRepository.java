package com.project.yozmcafe.domain.cafe;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CafeRepository extends JpaRepository<Cafe, Long> {
    Slice<Cafe> findSliceBy(Pageable pageable);


    @Query(value = "SELECT c FROM Cafe AS c "
            + "INNER JOIN UnViewedCafe AS u "
            + "ON c.id = u.cafe.id "
            + "WHERE u.member.id = :memberId")
    Slice<Cafe> findUnViewedCafesByMember(Pageable pageable, @Param("memberId") String memberId);
}