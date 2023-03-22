import { collection, getDocs, Firestore } from 'firebase/firestore/lite';

async function getCities(db: Firestore) {
	const citiesCol = collection(db, 'cities');
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map((doc) => doc.data());
	return cityList;
}

export { getCities };
