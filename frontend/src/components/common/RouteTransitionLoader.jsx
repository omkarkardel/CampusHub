const RouteTransitionLoader = ({ isVisible }) => {
  return (
    <div className={`route-loader ${isVisible ? "route-loader--active" : ""}`} aria-hidden={!isVisible}>
      <div className="route-loader__spinner" />
    </div>
  );
};

export default RouteTransitionLoader;
