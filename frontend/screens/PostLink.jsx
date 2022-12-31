import React, { useState, useContext } from 'react';

import {  ScrollView, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { FooterTabs } from '../components/nav';
import { SubmitButton } from '../components/auth';
import { Flex, Text } from '../components';
import ogs from 'open-graph-scraper-lite';
import urlRegex from 'url-regex';
import { PreviewCard } from '../components/links';
import axios from 'axios';
import { LinkContext } from '../context/link';
import { ActivityIndicator } from 'react-native';
import { SafeArea } from '../components';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-horizontal: 20px;
  margin-top: 20px;
`;

const CustomTextInput = styled.TextInput`
  height: 40px;
  border: 1px solid orange;
  margin-vertical: 10px;
  border-radius: 20px;
  padding: 5px 10px;
`;

const PostLink = ({ navigation }) => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [previewURL, setPreviewURL] = useState({});

  const [links, setLinks] = useContext(LinkContext);

  const handleLink = (text) => {
    setLink(text);
    console.log('sprawdzam liknk');
    if (urlRegex({ strict: false }).test(text)) {
      setLoading(true);
      console.log(' ok liknk');
      // ogs({ url: text }, (error, results, response) => {});

      setTimeout(() => {
        setLoading(false), [3000];
      });
    } else {
      setLoading(false);
    }
  };
  const handleImageUrl = (imageUrl) => {
    setImageUrl(imageUrl);

    var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    // Validate URL
    if (!httpRegex.test(imageUrl)) {
      setErrorMessage('Incorect url');
    } else {
      const ogp_object = {
        title: title,
        type: type,
        url: imageUrl,
        description: description,
        image: {
          url: imageUrl || 'http://ogp.me/logo.png',
          width: '300',
          height: '300',
          type: 'image/png'
        },
        requestUrl: 'http://ogp.me/',
        success: true
      };

      setPreviewURL(ogp_object);
      setTimeout(() => {
        setLoading(false), [3000];
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!link || !title) {
      alert('paste url');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:8800/api/post-link', {
        link,
        title,
        description,
        type,
        previewURL
      });
      setLinks([data, ...links]);
      setTimeout(() => {
        alert('Link posted');
        setLoading(false);
        navigation.navigate('Home');
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!loading ? (
        <Container>
          <Flex center>
            <Text title="PostLink" />
          </Flex>
          <CustomTextInput
            value={link}
            onChangeText={(text) => handleLink(text)}
            placeholder="Paste the url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomTextInput value={title} onChangeText={(text) => setTitle(text)} placeholder="Give me a title" autoCapitalize="sentences" />
          <CustomTextInput
            value={type}
            onChangeText={(text) => setType(text)}
            placeholder="Type of link  /website/social media/etc"
            autoCapitalize="sentences"
          />
          <CustomTextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Give me a description"
            autoCapitalize="sentences"
            style={{ height: Math.max(35, 10) }}
          />

          <CustomTextInput value={imageUrl} onChangeText={(text) => handleImageUrl(text)} placeholder="Paste image url" />
          <Text>{errorMessage}</Text>
          {previewURL.success && (
            <View>
              <PreviewCard {...previewURL} />
            </View>
          )}
          <SubmitButton title="submit now" loading={loading} handleSubmit={handleSubmit} />
        </Container>
      ) : (
        <SafeAreView>
          <ActivityIndicator />
        </SafeAreView>
      )}

      <FooterTabs />
    </>
  );
};

export default PostLink;
