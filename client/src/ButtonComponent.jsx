import React, { useState } from "react";

const ButtonComponent = () => {
  const [isClosureOpen, setIsClosureOpen] = useState(false);

  const toggleClosure = () => {
    setIsClosureOpen(!isClosureOpen);
  };

  return (
    <button class="search-result" >
      <div class="search-result-close"
        onClick={toggleClosure}
      >
        {isClosureOpen ? <span>&times;</span> : "+"}
      </div>
      search result
    </button>
  );
};

export default ButtonComponent;
 
