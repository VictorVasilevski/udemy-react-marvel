import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './transition.scss';

const TransitionComponent = ({ nodeRef, children }) => {
  const location = useLocation();
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        nodeRef={nodeRef}
        classNames="page"
        unmountOnExit
      >
        <div className="page" ref={nodeRef}>
            {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
