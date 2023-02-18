import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import uniqid from 'uniqid';

function getRandomTag() {
  return 'tag' + Math.round(Math.random() * 10);
}

const ALL_TAGS = [
  'tag0', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'
];

async function fetchImage() {
  return {
    id: uniqid(),
    src: 'https://cdn.pixabay.com/photo/2022/08/27/00/11/plant-7413415_960_720.png',
    tags: [getRandomTag(), getRandomTag()]
  }
}


function Dropdown({ selectedTag, handleFilter }) {
  return (
    <div className='dropdown-wrapper'>
      <select value={selectedTag} onChange={(e) => handleFilter(e.target.value)}>
        <option>No Filter</option>
        {ALL_TAGS && ALL_TAGS.map((tag, ind) => {
          return (
            <option key={tag} value={tag}>
              {tag}
            </option>
          )
        })
        }
      </select>
    </div>
  )
}

function Gallery({ images, status, handleToggle }) {

  return (
    <div className='images-wrapper'>
      {images && images.map((it, ind) => {
        console.log('it', it);

        return (
          <div className='image-item' onClick={() => handleToggle(it.id)}>
            {status[it.id] && <div className='tags-wrapper'>
              {it.tags && it.tags.map((t, tInd) => {
                return (
                  <span className='tag-node' key={tInd}>
                    {t}
                  </span>
                )
              })
              }
            </div>
            }

            {!status[it.id] &&
              <img key={it.id} src={it.src} className='image-node' />
            }
          </div>
        )
      })
      }
    </div>
  );
}

function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState({});
  const [selectedTag, setSelectedTag] = useState('');

  const handleMore = async () => {
    const data = await Promise.all([fetchImage(), fetchImage(), fetchImage()]);
    const old = images.slice();
    setImages(old.concat(data));
  };

  const handleToggle = (id) => {
    const newStatus = Object.assign({}, status);
    newStatus[id] = !newStatus[id];
    console.log('new', newStatus);
    setStatus(newStatus);
  };

  const handleFilter = (value) => {
    setSelectedTag(value);
  }

  const displayImages = selectedTag ? images.filter(im => im.tags.includes(selectedTag)) : images;

  return (
    <div className="App">
      <Dropdown selectedTag={selectedTag} handleFilter={handleFilter} />
      <Gallery images={displayImages} status={status} handleToggle={handleToggle} />

      <div>
        <button onClick={handleMore}>Load More</button>
      </div>
    </div>
  );
}

export default App;
