import React, { useState } from "react";
import Searchbar from "../../component/weapon-request/weapon-search-bar/searchbar";
import WeaponList from "../../component/weapon-request/weapon-list/weaponList";
import RequestList from "../../component/weapon-request/weapon-request-list/requestList";

export default function Request() {
  const [weaponList, setWeaponList] = useState([]);
  const [wishList, setWishList] = useState([]);

  return (
    <>
      <Searchbar
        setWeapon={(list) =>
          setWeaponList((prevList) => [...prevList, ...list])
        }
      />
      <WeaponList
        wishList={wishList}
        setWishList={(wishList) => setWishList(wishList)}
        weaponInfo={weaponList}
        setWeaponInfo={setWeaponList}
      />
      <RequestList wishList={wishList} />
      
    </>
  );
}
