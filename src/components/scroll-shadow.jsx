import { cn } from '@/lib/utils';
import {
  cloneElement,
  Children,
  useRef,
  useEffect,
  useState,
} from 'react';

export function ScrollShadow({ children, ...props }) {
  const child = Children.only(children);
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScrollState = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        element;

      setScrollState({
        canScrollUp: scrollTop > 24,
        canScrollDown:
          scrollTop < scrollHeight - clientHeight - 24,
      });
    };

    updateScrollState();

    element.addEventListener('scroll', updateScrollState);

    const resizeObserver = new ResizeObserver(
      updateScrollState,
    );
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener(
        'scroll',
        updateScrollState,
      );
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        'overflow-hidden mask-[linear-gradient(to_bottom,transparent_0%,black_12%)] mask-size-[100%_112%] mask-position-[100%_0%] mask-no-repeat transition-all duration-300',
        !scrollState.canScrollUp &&
          'mask-position-[100%_100%]',
        props?.className,
      )}
    >
      <div
        className={cn(
          'h-full overflow-y-auto mask-[linear-gradient(to_bottom,black_88%,transparent_100%)] mask-size-[100%_112%] mask-position-[100%_100%] mask-no-repeat transition-all duration-300',
          !scrollState.canScrollDown &&
            'mask-position-[100%_0%]',
        )}
        ref={scrollRef}
      >
        {child}
      </div>
    </div>
  );
}
