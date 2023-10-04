import React from "react";

interface Props {
  params: {
    id: number;
    photoId: number;
  };
}

const PhotosId = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      PhotosId {id} - {photoId}
    </div>
  );
};

export default PhotosId;
