import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, List, ListItem } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import universities from '@/data/universities.json';
import { UniversityCard } from '@/components/university/UniversityCard';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';
import { UniversityWithDetails } from '@/types/university';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: universities.map((uni) => ({ params: { id: uni.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const university = universities.find((uni) => uni.id === params?.id);
  if (!university) {
    return { notFound: true };
  }
  return { props: { university } };
};

const UniversityPage = ({ university }: { university: UniversityWithDetails }) => {
  return (
    <Layout>
      <Box maxW="container.xl" mx="auto" p={6}>
        <UniversityCard university={university} />
        <AdBanner adSlot="courses-popular" />
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
              <Text mt={2}>{university.overview?.description || 'No description available.'}</Text>
              {university.overview?.rankings && (
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
              {university.programs?.length > 0 ? (
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
              ) : (
                <Text>No programs listed.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Fee Structure</Heading>
              {university.fees?.length > 0 ? (
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
              ) : (
                <Text>No fee information available.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Admission Requirements</Heading>
              {university.admissions ? (
                <VStack mt={4} align="start">
                  <Text>Deadlines: Fall {university.admissions.deadlines.fall}{university.admissions.deadlines.spring ? `, Spring ${university.admissions.deadlines.spring}` : ''}</Text>
                  <Text>Requirements:</Text>
                  <List>
                    {Object.entries(university.admissions.requirements || {}).map(([level, reqs]) => (
                      <ListItem key={level}>{level}: {reqs.join(', ')}</ListItem>
                    ))}
                  </List>
                  <Text>Tests: {(university.admissions.tests || []).join(', ') || 'N/A'}</Text>
                  <Text>Merit Criteria: {university.admissions.meritCriteria || 'N/A'}</Text>
                </VStack>
              ) : (
                <Text>No admission information available.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Campus Life</Heading>
              {university.campusLife ? (
                <VStack mt={4} align="start">
                  <Text>Facilities: {(university.campusLife.facilities || []).join(', ') || 'N/A'}</Text>
                  <Text>Societies: {(university.campusLife.societies || []).join(', ') || 'N/A'}</Text>
                  <Text>Events: {(university.campusLife.events || []).join(', ') || 'N/A'}</Text>
                </VStack>
              ) : (
                <Text>No campus life information available.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Placement Statistics</Heading>
              {university.placements?.statistics?.placementRate ? (
                <VStack mt={4} align="start">
                  <Text>Placement Rate: {university.placements.statistics.placementRate}</Text>
                  <Text>Average Salary: {university.placements.statistics.averageSalary}</Text>
                  <Text>Top Employers: {university.placements.statistics.topEmployers?.join(', ') || 'N/A'}</Text>
                </VStack>
              ) : (
                <Text>Placement data coming soon.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Contact Information</Heading>
              {university.contact ? (
                <VStack mt={4} align="start">
                  <Text>Address: {university.contact.address || 'N/A'}</Text>
                  <Text>Phone: {university.contact.phone || 'N/A'}</Text>
                  <Text>Email: {university.contact.email || 'N/A'}</Text>
                  <Text>Admissions Office: {university.contact.admissionsOffice || 'N/A'}</Text>
                </VStack>
              ) : (
                <Text>No contact information available.</Text>
              )}
            </TabPanel>
            <TabPanel>
              <Heading size="md">Recent News</Heading>
              {university.news?.length > 0 ? (
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