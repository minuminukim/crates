import defaultImage from '../images/defaultalbumimage.jpg';

function handleImageError(e) {
  e.target.src = defaultImage;
  e.target.onerror = null;
  return true;
}

export default handleImageError;
