const Gallery = ({ images }) => {
    return (
      <div>
        <h2>Gallery</h2>
        {images.length === 0 ? (
          <p>No screenshots yet.</p>
        ) : (
          <div className="gallery">
            {images.map((url, index) => (
              <img key={index} src={url} alt={`Screenshot ${index}`} className="thumbnail" />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Gallery;
  