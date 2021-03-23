import Masonry from 'react-masonry-css';
import '../../styles/HomePage/MasonryWrapper.css';
import React from 'react';
import MasonryPoll from './MasonryPoll'

// interface MasonryWrapperProps {

// }

function MasonryWrapper() {
  
  var items = [
    {id: 1, text: 'My First Item', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 2, text: 'Another item', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 3, text: 'Third Item', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 4, text: 'Here is the Fourth', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)},
    {id: 5, text: 'High Five', backgroundColor: 'blue', height: Math.max(150, Math.random() * 500)}
  ];

  const divItems = items.map(function(item) {
    return <div><MasonryPoll key={item.id} height={item.height} backgroundColor={item.backgroundColor} text={item.text} /></div>
    // return <MasonryPoll key={item.id} height={item.height} backgroundColor={item.backgroundColor} text={item.text} />
  });

  const breakpointColumnsObj = {
    default: 6,
    1700: 5,
    1200: 4,
    1000: 3,
    700: 2,
    600: 1
  };

	return (
		<>
			<Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {divItems}
      </Masonry>
		</>
	);
}
 
export default MasonryWrapper;
