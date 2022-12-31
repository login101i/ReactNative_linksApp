import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import { FooterTabs } from '../components/nav';
import { Flex, Text } from '../components';
import axios from 'axios';
import { PreviewCard, Search } from '../components/links';
import { SubmitButton } from '../components/auth';
import styled from 'styled-components/native';
import { CustomActivityIndicator } from '../components/CustomActivityIndicator';

const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const CustomScrollView = styled.ScrollView`
  background-color: white;
  filter: ${(props) => (props.modal ? 'blur(3px)' : 'none')};
`;

const Home = ({ navigation }) => {
  const [links, setLinks] = useContext(LinkContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    setLoading(true);
    const { data } = await axios.get(`http://localhost:8800/api/links/${page}`);
    setTimeout(() => {
      setLinks([...links, ...data]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const linksCount = async () => {
      const { data } = await axios.get('http://localhost:8800/api/links-count');
      setLinksCount(data);
    };
    linksCount();
  }, []);

  const handlePress = async (link) => {
    await axios.put(`http://localhost:8800/api/view-count/${link._id}`);
    navigation.navigate('LinkView', { link });

    setLinks(() => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = { ...link, views: link.views + 1 };
      return [...links];
    });
  };

  const searched = (keyword) => (item) => {
    return item.previewURL?.title.toLowerCase().includes(keyword.toLowerCase());
  };

  return (
    <>
      <Container>
        <Search value={keyword} setValue={setKeyword} />
        <CustomScrollView showsVerticalScrollIndicator={false}>
          <Flex center>
            <Text title="Recent Links" />
          </Flex>

          {links &&
            links.filter(searched(keyword)).map((link) => (
              <View key={link._id}>
                <PreviewCard {...link.previewURL} handlePress={handlePress} link={link} showIcons={true} />
              </View>
            ))}
          {loading ? (
            <CustomActivityIndicator />
          ) : (
            linksCount > links?.length && <SubmitButton title="Load more" handleSubmit={() => setPage(page + 1)} />
          )}
        </CustomScrollView>
      </Container>
      <FooterTabs />
    </>
  );
};

export default Home;
