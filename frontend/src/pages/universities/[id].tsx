import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, List, ListItem } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import rawData from '@/data/universities.json';
import { UniversityCard } from '@/components/university/UniversityCard';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';
import { University, UniversityWithDetails } from '@/types/university';

const universities = rawData as UniversityWithDetails[];

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'universities.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const universities: UniversityWithDetails[] = JSON.parse(fileContents);

  return {
    paths: universities.map((uni) => ({ params: { id: uni.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'universities.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const universities: UniversityWithDetails[] = JSON.parse(fileContents);
  const university = universities.find((uni) => uni.id === params?.id);

  return { props: { university } };
};

const UniversityPage = ({ university }: { university: UniversityWithDetails }) => {
  return (
    <Layout>
      <Box maxW="container.xl" mx="auto" p={6}>
        <UniversityCard university={university} />
        <AdBanner adSlot="header" />
        <Tabs mt={6} variant="enclosed">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Programs</Tab>
            <Tab>Fees</Tab>
            <Tab>Admissions</Tab>
            <Tab>Campus Life</Tab>
            <Tab>Placements</Tab>
            <Tab>Contact</Tab>
            <Tab>News</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading size="md">Overview</Heading>
              <Text mt={2}>{university.overview.description}</Text>
              {university.overview.rankings && (
                <VStack mt={4} align="start">
                  <Text>Rankings:</Text>
                  <List>
                    {university.overview.rankings.hec && <ListItem>HEC: {university.overview.rankings.hec}</ListItem>}
                    {university.overview.rankings.qs && <ListItem>QS: {university.overview.rankings.qs}</ListItem>}
                    {university.overview.rankings.local && <ListItem>Local: {university.overview.rankings.local}</ListItem>}
                  </List>
                </VStack>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Programs Offered</Heading>
              <Table mt={4}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Degree</Th>
                    <Th>Duration</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {university.programs.map((program) => (
                    <Tr key={program.id}>
                      <Td>{program.name}</Td>
                      <Td>{program.degree}</Td>
                      <Td>{program.duration}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Fee Structure</Heading>
              <Table mt={4}>
                <Thead>
                  <Tr>
                    <Th>Program</Th>
                    <Th>Semester</Th>
                    <Th>Total (PKR)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {university.fees.map((fee, index) => (
                    <Tr key={index}>
                      <Td>{fee.program}</Td>
                      <Td>{fee.semester}</Td>
                      <Td>{fee.total}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Admission Requirements</Heading>
              <VStack mt={4} align="start">
                <Text>Deadlines: Fall {university.admissions.deadlines.fall}</Text>
                <Text>Requirements:</Text>
                <List>
                  {Object.entries(university.admissions.requirements).map(([level, reqs]) => (
                    <ListItem key={level}>{level}: {reqs.join(', ')}</ListItem>
                  ))}
                </List>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Campus Life</Heading>
              <VStack mt={4} align="start">
                <Text>Facilities: {university.campusLife.facilities.join(', ')}</Text>
                <Text>Societies: {university.campusLife.societies.join(', ')}</Text>
                <Text>Events: {university.campusLife.events.join(', ')}</Text>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Placement Statistics</Heading>
              {university.placements.statistics.placementRate ? (
                <VStack mt={4} align="start">
                  <Text>Placement Rate: {university.placements.statistics.placementRate}</Text>
                  <Text>Average Salary: {university.placements.statistics.averageSalary}</Text>
                  <Text>Top Employers: {university.placements.statistics.topEmployers?.join(', ')}</Text>
                </VStack>
              ) : (
                <Text>Placement data coming soon.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Contact Information</Heading>
              <VStack mt={4} align="start">
                <Text>Address: {university.contact.address}</Text>
                <Text>Phone: {university.contact.phone}</Text>
                <Text>Email: {university.contact.email}</Text>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Recent News</Heading>
              {university.news.length > 0 ? (
                <List mt={4}>
                  {university.news.map((item) => (
                    <ListItem key={item.id}>
                      <Text>{item.title} ({item.date})</Text>
                      <Text>{item.summary}</Text>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No recent news available.</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <AdBanner adSlot="in_article" />
      </Box>
    </Layout>
  );
};

export default UniversityPage;