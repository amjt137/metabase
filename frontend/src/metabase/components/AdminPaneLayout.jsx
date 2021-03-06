/* eslint-disable react/prop-types */
import React from "react";

import Button from "metabase/core/components/Button";
import Link from "metabase/core/components/Link";

const AdminPaneTitle = ({
  title,
  description,
  buttonText,
  buttonAction,
  buttonDisabled,
  buttonLink,
  headingContent,
}) => (
  <section className="clearfix px2">
    {buttonText && buttonLink && (
      <Link to={buttonLink} className="inline-block float-right">
        <Button primary>{buttonText}</Button>
      </Link>
    )}
    {buttonText && buttonAction && (
      <Button
        className="float-right"
        primary={!buttonDisabled}
        disabled={buttonDisabled}
        onClick={buttonAction}
      >
        {buttonText}
      </Button>
    )}
    {headingContent && <React.Fragment>{headingContent}</React.Fragment>}
    {title && <h2 className="PageTitle">{title}</h2>}
    {description && <p className="text-measure">{description}</p>}
  </section>
);

const AdminPaneLayout = ({
  title,
  description,
  buttonText,
  buttonAction,
  buttonDisabled,
  children,
  buttonLink,
  headingContent,
}) => (
  <div className="wrapper">
    <AdminPaneTitle
      title={title}
      description={description}
      buttonText={buttonText}
      buttonAction={buttonAction}
      buttonDisabled={buttonDisabled}
      buttonLink={buttonLink}
      headingContent={headingContent}
    />
    {children}
  </div>
);

export default AdminPaneLayout;
