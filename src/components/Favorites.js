import { useState } from "react";
import styles from './Favorites.module.css'
import { FaStar } from "react-icons/fa";

// function FavoritesMenu({ onAdd, locationArray }) {
function FavoritesMenu({ }) {
  const locationArray = [{
    "zip": "259569",
    "name": "Singapore",
    "lat": 1.3126,
    "lon": 103.8162,
    "country": "SG"
  },
  {
    "zip": "259569",
    "name": "Malaysia",
    "lat": 1.3126,
    "lon": 103.8162,
    "country": "SG"
  },

  ]
  const [showList, setShowList] = useState(false);

  return (

    <div className={styles.dropdown}
      onMouseEnter={() => setShowList(true)}
      onMouseLeave={() => setShowList(false)}>
      <button className={styles.dropbtn}
      >
        <FaStar />
      </button>
      {showList && (
        <div className={styles.dropdowncontent}
        >
          <a href="#" className={styles.locationli}>Add to favorites</a>
          {locationArray.map((loc) => {
            return <a href="#" className={styles.locationli}>{loc.name}</a>;
          })}
        </div>
      )}
    </div>
  );
}
export default FavoritesMenu;