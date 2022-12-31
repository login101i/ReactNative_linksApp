import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import axios from 'axios';
import { CircleLogo, SubmitButton } from '../components/auth';
import { Flex, Text, SafeArea } from '../components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const MainContainer = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  padding-bottom: 30px;
  padding-top: 20px;
`;

const CustomBackground = styled.ImageBackground`
  position: absolute;
  top: 0%;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  object-fit: contain;
  filter: blur(1px);
  opacity: 0.1;
`;

const CustomContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
`;

const CustomImage = styled.Image`
  width: 100%;
  height: 300px;
`;

const Profile = ({ navigation }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const routeParamsId = route?.params?._id;

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const { data } = await axios.get(`http://localhost:8800/api/user-profile/${userId}`);
        setUserProfile(data.user);
        setUserLinks(data.links);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    };
    routeParamsId ? fetchUserProfile(routeParamsId) : fetchUserProfile(auth.user._id);
  }, []);

  let date;
  const d = new Date(userProfile.createdAt);
  date = d.getDate() + '/' + d.getMonth() + 1 + '/' + d.getFullYear();


  const handleDelete = async (linkId) => {
    try {
      setUserLinks((links) => {
        const index = userLinks.findIndex((l) => l._id === linkId);
        userLinks.splice(index, 1);
        return [...links];
      });
      setLinks((links) => {
        const index = links.findIndex((l) => l._id === linkId);
        userLinks.splice(index, 1);
        return [...links];
      });
      await axios.delete(`http://localhost:8800/api/removelink/${linkId}`);
      alert('Link deleted successfully');
    } catch (err) {
      console.log(err);
      alert('Delete failed');
    }
  };

  if (loading) {
    return (
      <CustomContainer>
        <CustomImage source={require('../assets/loadingGif.gif')}></CustomImage>
      </CustomContainer>
    );
  }

  return (
    <>
      <MainContainer>
        <Flex center>
          <Text size={30}>User Profile</Text>
        </Flex>
        <CircleLogo image={userProfile?.image?.url} />
        <ScrollView>
          <Flex align column>
            <Text size={16}>{userProfile.name}</Text>
            <Text size={16}>{userProfile.role}</Text>
            <Text size={16}>Member from {date}</Text>

            <Divider width={3} />
          </Flex>
          <ScrollView style={{ padding: '15px' }}>
            <Text>{userLinks.length} Links</Text>
            {userLinks.map((link) => (
              <>
                <Flex row space key={link._id}>
                  <Text marginTop={10}>{link.previewURL.title}</Text>
                  {auth?.user?._id === link?.postedBy._id && (
                    <TouchableOpacity onPress={() => handleDelete(link._id)}>
                      <FontAwesome5 name="trash" size={20} color="orange" />
                    </TouchableOpacity>
                  )}
                </Flex>
                <Divider width={2} />
              </>
            ))}
          </ScrollView>
        </ScrollView>
        <Flex center>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <FontAwesome5Icon name="arrow-left" size={35} color="orange" />
          </TouchableOpacity>
        </Flex>
      </MainContainer>
      <CustomBackground source={require('../assets/candleBackground.jpg')} />
    </>
  );
};

export default Profile;
