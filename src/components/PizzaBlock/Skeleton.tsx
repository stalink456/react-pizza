import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <div className="pizza-block">
      <ContentLoader
        speed={2}
        width={280}
        height={461}
        viewBox="0 0 280 461"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="266" rx="10" ry="10" width="263" height="22" />
        <rect x="0" y="300" rx="10" ry="10" width="263" height="88" />
        <rect x="0" y="398" rx="10" ry="10" width="95" height="30" />
        <rect x="129" y="398" rx="25" ry="25" width="133" height="45" />
      </ContentLoader>
    </div>
  </div>
);

export default Skeleton;
