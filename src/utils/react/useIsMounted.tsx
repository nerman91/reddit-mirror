import React from 'react';

const [isMounted] = useIsMounted();

function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted];
}
