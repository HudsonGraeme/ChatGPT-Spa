import { useState, useEffect } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ComponentList = () => {
  const location = useLocation();
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (!location?.pathname) return;
    const componentName = location.pathname.split("/")[2];
    import(`./SPAs/${componentName}.jsx`)
      .then((module) => setComponent(module.default))
      .catch((err) => console.error(err));
  }, [location]);
  return (
    <Box>
      <Text>List of available SPAs:</Text>
      <Box as="ul">
        {Object.keys(require.context(".", true, /\.jsx$/).keys()).map(
          (component, i) => {
            const componentName = component.split("/")[1];
            return (
              <Box as="li" key={i}>
                <Link to={`/spas/${componentName}`}>{componentName}</Link>
              </Box>
            );
          }
        )}
      </Box>
      {Component && <Component />}
    </Box>
  );
};

export default ComponentList;
