import { useInfiniteQuery } from '@tanstack/react-query';
import client from '../client';

/**
 * `/cafes` 엔드포인트에서 받아오는 데이터(상태)를 사용할 수 있는 커스텀 훅입니다.
 * react-query의 `useInfiniteQuery` 를 사용하여 구현되었습니다.
 *
 * @example
 * ```
 * const Example = () => {
 *   const { cafes, fetchNextPage } = useCafes();
 *
 *   useEffect(() => {
 *     fetchNextPage(); // 마운트 되었을 때 다음 페이지를 fetch
 *   }, []);
 *
 *   return <>{cafes.map((cafe) => <CafeExample key={cafe.id} cafe={cafe} />)}</>
 * }
 * ```
 */
const useCafes = () => {
  const queryResult = useInfiniteQuery({
    queryKey: [''],
    queryFn: ({ pageParam = 1 }) => client.getCafes(pageParam).then((cafes) => ({ cafes, page: pageParam })),
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
  return {
    ...queryResult,
    data: queryResult.data as NonNullable<typeof queryResult.data>,
    cafes: queryResult.data?.pages.flatMap(({ cafes }) => cafes) ?? [],
  };
};

export default useCafes;