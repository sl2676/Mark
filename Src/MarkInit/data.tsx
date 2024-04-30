import { Image } from 'react-native';
import exPost1 from './post1.jpeg';
import exPost2 from './post2.jpeg';
import exPost3 from './post3.jpeg';
 
const exPostUri1 = Image.resolveAssetSource(exPost1).uri
const exPostUri2 = Image.resolveAssetSource(exPost2).uri
const exPostUri3 = Image.resolveAssetSource(exPost3).uri

export default data = [
  {
    title: "Aenean leo",
	location: 'Mumbai, India',
	date: 'Nov 17th, 2020',
    imgUrl: exPostUri1
  },
  {
    title: "In turpis",
	location: 'Unknown',
	date: 'Sept 3rd, 2020',
    imgUrl: exPostUri2
  },
  {
    title: "Lorem Ipsum",
	location: 'Prague, Czech Republic',
	date: 'Oct 11th, 2020',
    imgUrl: exPostUri3
  }
]
