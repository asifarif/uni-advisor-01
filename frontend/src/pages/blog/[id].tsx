import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';

const posts: { [key: string]: { title: string; content: string } } = {
  'Degrees or Skills': {
    title: 'Degrees or Skills? Realigning Our Higher Education Focus in Pakistan',
    content: ` We often hear the debate: are Pakistani universities churning out graduates with degrees, or individuals equipped with relevant skills? There is no doubt about that degree open doors of opportunities. However, the rapidly evolving job market, particularly in tech and industry, screams for skills and practical know-how. This isn't just about curriculum; it's fundamentally about who is teaching and how they are empowered.
    
    One of the critical issues lies with our faculty. If the faculty members are not familiar with the latest tools, techniques, and industry practices, how can they effectively impart future-ready skills? Continuous, high-quality faculty training isn't a luxury; it's the bedrock of a quality education system. This training must go beyond theoretical knowledge. We send students for internships to grasp industry needs, yet many faculty members have limited firsthand experience of the modern industrial landscape. This disconnect inevitably translates into a gap between academic learning and real-world application.
    
    Furthermore, our higher education system often seems to prioritize a narrow definition of academic achievement for faculty. The pathway to promotion and recognition is heavily paved with PhD degrees and a specific count of research papers. The emphasis on research output sometimes overshadows other crucial contributions. What about the brilliant practitioner who can solve complex industry problems and mentor students in practical innovation, but may not have a traditional research aptitude or a desire for a PhD? We risk sidelining immense talent and practical wisdom by not having flexible pathways that recognise and reward such industry-linked expertise.
    
    It is time for a paradigm shift. We need to invest in our faculty, training them not only in their academic disciplines but also fostering an entrepreneurial mindset and relevant industrial skills development. Imagine faculty members actively involved in industry projects, perhaps even incubating startups within university campuses. This creates a dynamic ecosystem where "industry within the institution" becomes a reality. Teachers who are also entrepreneurs or active industry consultants can provide unparalleled, real-time insights to students, making learning more applied and impactful. This model could be the most effective way to truly bridge the academia-industry gap, ensuring our graduates are not just degree holders, but skilled, adaptable, and innovative contributors to Pakistan's future.`,
  },

  'engineering-education': {
    title: 'Engineering Institutions in Karachi',
    content: `Karachi’s engineering institutions, including prestigious names like NED University and Sir Syed University, face a critical juncture. Despite their legacy, the rigid focus on theory-heavy curricula leaves graduates underprepared for today’s fast-moving engineering challenges. 
    
    The solution? A complete overhaul—one that balances textbook fundamentals with hands-on problem-solving, creativity, and adaptability. While some progress has been made—like integrating new technologies into coursework—the disconnect between classrooms and industry remains stark. Students need more than lectures; they require real-world experience through mandatory internships, industry collaborations, and live project work. Imagine engineering programs where local tech firms help design syllabi, where semester-long workshops replace outdated exams, and where students prototype solutions for actual city infrastructure problems. Research must also move from the periphery to the center. Cutting-edge labs, cross-disciplinary hackathons, and professor-student innovation grants could transform Karachi into a regional R&D powerhouse. Picture final-year projects that don’t just gather dust but get patented or implemented by municipal authorities. The path forward is clear: Karachi’s engineering universities must pivot from passive learning to active creation. By merging academic rigor with entrepreneurial thinking and industry immersion, the next generation of engineers won’t just fill jobs—they’ll redefine them.  
    
    Dr. M. Yousuf Irfan Zia (https://www.linkedin.com/in/yirfanzia)`,
  },
};



export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const post = id && posts[id as string];

  if (!post) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Heading>Post Not Found</Heading>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>{post.title}</Heading>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
        <AdBanner adSlot="in_article" />
      </Container>
    </Layout>
  );
}