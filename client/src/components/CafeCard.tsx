import type { MouseEventHandler, UIEventHandler } from 'react';
import { Suspense, useCallback, useState } from 'react';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { PiHeartFill, PiReadCvLogoFill } from 'react-icons/pi';
import { styled, useTheme } from 'styled-components';
import { useToast } from '../context/ToastContext';
import useCafeLikes from '../hooks/useCafeLikes';
import useClipboard from '../hooks/useClipboard';
import useUser from '../hooks/useUser';
import type { Cafe } from '../types';
import { withGAEvent } from '../utils/GoogleAnalytics';
import Resource from '../utils/Resource';
import CafeDetailBottomSheet from './CafeDetailBottomSheet';
import CafeMenuBottomSheet from './CafeMenuBottomSheet';
import CafeSummary from './CafeSummary';
import IconButton from './IconButton';

type CardProps = {
  cafe: Cafe;
};

const CafeCard = (props: CardProps) => {
  const { cafe } = props;

  const theme = useTheme();
  const showToast = useToast();
  const clipboard = useClipboard();
  const { isLiked, setLiked } = useCafeLikes(cafe);
  const { data: user } = useUser();

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const likeCount = cafe.likeCount + (isLiked ? 1 : 0);

  const handleScroll: UIEventHandler = useCallback((event) => {
    if (!(event.target instanceof HTMLDivElement)) return;

    const { scrollLeft, clientWidth } = event.target;
    const index = Math.round(scrollLeft / clientWidth);
    setCurrentImageIndex(index);
  }, []);

  const handleShare = withGAEvent('share', { cafeName: cafe.name }, async () => {
    try {
      await clipboard.copyToClipboard(`https://yozm.cafe/cafes/${cafe.id}`);
      showToast('success', 'URL이 복사되었습니다!');
    } catch (error) {
      showToast('error', `URL 복사 실패: ${error}`);
    }
  });

  const handleLikeCountIncrease = withGAEvent('click_like_button', { cafeName: cafe.name }, () => {
    if (!user) {
      showToast('error', '로그인이 필요합니다!');
      return;
    }
    setLiked({ isLiked: !isLiked });
  });

  const handleDetailOpen = withGAEvent('click_detail_button', { cafeName: cafe.name }, () => {
    setIsShowDetail(true);
  });

  const handleDetailClose = () => {
    setIsShowDetail(false);
  };

  const handleMenuOpen = withGAEvent('click_menu_button', { cafeName: cafe.name }, () => {
    setIsMenuOpened(true);
  });

  const handleMenuClose = () => {
    setIsMenuOpened(false);
  };

  const handleStopPropagation: MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <Container>
      <CardQuantityContainer>
        <CardQuantityContents>
          {`${currentImageIndex + 1}`}/{cafe.images.length}
        </CardQuantityContents>
      </CardQuantityContainer>

      <CarouselImageList onScroll={handleScroll}>
        {cafe.images.map((image, index) => (
          <CarouselImage
            key={index}
            src={Resource.getImageUrl({ size: '500', filename: image })}
            alt={`${cafe.name}의 ${index + 1}번째 이미지`}
            loading={Math.abs(currentImageIndex - index) <= 1 ? 'eager' : 'lazy'}
          />
        ))}
      </CarouselImageList>

      <Bottom onClick={handleStopPropagation}>
        <BottomItem $fullWidth>
          <CafeSummary title={cafe.name} address={cafe.address} onClick={handleDetailOpen} />
        </BottomItem>

        <BottomItem $align="right">
          <ActionBar>
            <IconButton label="공유" onClick={handleShare}>
              <FaShare />
            </IconButton>

            <IconButton label={String(likeCount)} onClick={handleLikeCountIncrease}>
              <PiHeartFill fill={isLiked ? theme.color.primary : theme.color.white} />
            </IconButton>

            <IconButton label="메뉴" onClick={handleMenuOpen}>
              <PiReadCvLogoFill />
            </IconButton>

            <IconButton label="더보기" onClick={handleDetailOpen}>
              <BiSolidInfoCircle />
            </IconButton>
          </ActionBar>
        </BottomItem>
      </Bottom>

      <DotsContainer>
        {cafe.images.map((_, index) => (
          <Dot key={index} $active={index === currentImageIndex} />
        ))}
      </DotsContainer>

      {isShowDetail && <CafeDetailBottomSheet cafe={cafe} onClose={handleDetailClose} />}

      {isMenuOpened && (
        <Suspense>
          <CafeMenuBottomSheet cafe={cafe} onClose={handleMenuClose} />
        </Suspense>
      )}
    </Container>
  );
};

export default CafeCard;

const Container = styled.div`
  position: relative;

  overflow: hidden;

  height: 100%;

  color: ${({ theme }) => theme.color.white};
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);

  & svg {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.7));
  }
`;

const CarouselImageList = styled.div`
  scroll-snap-type: x mandatory;

  overflow-x: auto;
  display: flex;

  width: 100%;
  height: 100%;
`;

const CarouselImage = styled.img.attrs({ draggable: false })`
  scroll-snap-align: start;
  scroll-snap-stop: always;

  flex: 0 0 100%;

  min-width: 100%;
  height: 100%;

  object-fit: cover;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space[5]};
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;

const Dot = styled.div<{ $active: boolean }>`
  cursor: pointer;

  width: 8px;
  height: 8px;

  background-color: ${({ $active, theme }) => ($active ? theme.color.white : theme.color.gray)};
  border-radius: 50%;
`;

const CardQuantityContainer = styled.div`
  position: absolute;

  display: flex;
  justify-content: flex-end;

  width: 100%;
  padding: ${({ theme }) => theme.space['2.5']} ${({ theme }) => theme.space['2.5']} 0 0;

  text-shadow: none;
`;

const CardQuantityContents = styled.div`
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.color.background.secondary};
  border-radius: 10px;
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  width: 100%;
`;

const BottomItem = styled.div<{ $fullWidth?: boolean; $align?: 'left' | 'right' }>`
  position: absolute;
  bottom: 0;
  ${({ $align }) => $align === 'left' && 'left: 0;'}
  ${({ $align }) => $align === 'right' && 'right: 0;'}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`;

const ActionBar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  align-self: flex-end;

  padding: ${({ theme }) => theme.space[3]};

  color: white;
`;
