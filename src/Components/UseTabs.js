import { useState } from "react";

const UseTabs = (initTab, allTabs) => {
    if (!allTabs || !Array.isArray(allTabs)) {
        console.log("what the ...");
        return;
    }

    const [currentIndex, setCurrentIndex] = useState(initTab);

    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    };
};

export default UseTabs;