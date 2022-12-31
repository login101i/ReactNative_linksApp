import React, { useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../components';
import axios from 'axios';
import { LinkContext } from '../../context/link';
import { AuthContext } from '../../context/auth';
import { IconSet } from '../../components/links';

const Container = styled.View`
  display: flex;
  height: 260px;
  background-color: 'darkGrey';
  width: 90%;
  border: 2px solid orange;
  margin: 0 auto;
  border-radius: 11px;
  -webkit-box-shadow: -2px 9px 19px -16px rgba(66, 68, 90, 1);
  -moz-box-shadow: -2px 9px 19px -16px rgba(66, 68, 90, 1);
  position: relative;
  background: white;
  margin-vertical: 5px;
  margin-bottom: 20px;
`;

const CustomView = styled.View`
  position: absolute;
  bottom: 15px;
  display: flex;
  padding: 5px 10px;
  display: flex;
  align-items: flex-start;
  border-radius: 5px;
  justify-content: center;
  background-color: white;
  margin-left: 10px;
`;
const CustomImage = styled.Image`
  padding: 5px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
`;

const PreviewCard = ({
  title = 'untitled',
  type,
  url,
  description,
  image = { url: url || 'https://via.placeholder.com/500x500.png?Image' },
  handlePress = (f) => f,
  link,
  showIcons = false
}) => {
  const [links, setLinks] = useContext(LinkContext);
  const [auth, setAuth] = useContext(AuthContext);

  const handleLike = async (link) => {
    const { data } = await axios.put('http://localhost:8800/api/like', {
      linkId: link._id
    });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const handleUnlike = async (link) => {
    const { data } = await axios.put('http://localhost:8800/api/unlike', {
      linkId: link._id
    });

    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const imageUrl = (image) => {
    if (image?.url) {
      return image.url;
    } else if (image?.length > 0) {
      return image[0].url;
    } else {
      return 'https://via.placeholder.com/500x500.png?Image';
    }
  };

  return (
    <TouchableOpacity onPress={() => handlePress(link)}>
      <Container>
        <CustomImage source={imageUrl(image)} />
        <CustomView>
          <Text size={17}>{title}</Text>
          <Text size={17}>{type}</Text>
          <Text size={17} wrap="true">
            {description}
          </Text>
        </CustomView>
        <IconSet handleLike={handleLike} handleUnlike={handleUnlike} link={link} showIcons={showIcons} auth={auth} />
      </Container>
    </TouchableOpacity>
  );
};

export default PreviewCard;
