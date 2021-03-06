import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Carousel } from 'rsuite';
import TimeMachine from '../components/panels/TimeMachinePanel';
import Start from '../components/panels/StartPanel';
import Filmtok from '../components/panels/FilmtokPanel';
import '../styles/home.less';

const swipeConfig = {
	delta: 300,
	trackTouch: true,
	trackMouse: true,
};
const pageStates = Array(3)
	.fill()
	.map((_, ind) => ({ activeIndex: ind, lastIndex: ind }));

const HomePage = () => {
	const carouselRef = useRef(null);

	const [storyShown, setstoryShown] = useState(false);
	const [modalBlocking, setmodalBlocking] = useState(false);

	const switchCarousel = (state) => carouselRef.current.setState(state);

	const getNewInd = (decreasing = false) => {
		const curr = carouselRef.current.state.activeIndex;
		if (decreasing) {
			return curr > 0 ? curr - 1 : 0;
		} else {
			return curr < pageStates.length - 1 ? curr + 1 : curr;
		}
	};

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => {
			if (!modalBlocking) {
				switchCarousel(pageStates[getNewInd()]);
			}
		},
		onSwipedRight: () => {
			if (!modalBlocking) {
				switchCarousel(pageStates[getNewInd(true)]);
			}
		},
		...swipeConfig,
	});

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--vh',
			`${window.innerHeight * 0.01}px`
		);
	}, []);

	return (
		<>
			<div {...swipeHandlers} className='swipe-provider h-full'>
				<Carousel
					ref={carouselRef}
					placement='top'
					shape='bar'
					className={storyShown ? 'story-open' : ''}
				>
					<Start
						key={1}
						globalModalBlocking={modalBlocking}
						setGlobalModalBlocking={setmodalBlocking}
						story={{ shown: storyShown, setShown: setstoryShown }}
					/>
					<TimeMachine key={2} />
					<Filmtok key={3} />
				</Carousel>
			</div>
		</>
	);
};

export default HomePage;
