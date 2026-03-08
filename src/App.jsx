/**
 * Root component: chooses which carousel to display.
 * Swap between custom Carousel and library-based SlickCarousel by commenting/uncommenting below.
 */
import Carousel from './Carousel';
// eslint-disable-next-line no-unused-vars -- kept for optional use; uncomment <SlickCarousel /> to enable
import SlickCarousel from './SlickCarousel';

const App = () => {
  return (
    <main>
      {/* Custom carousel (useState + useEffect); default view */}
      <Carousel />
      {/* Library carousel (react-slick); uncomment to use instead of or alongside Carousel */}
      {/* <SlickCarousel /> */}
    </main>
  );
};
export default App;
