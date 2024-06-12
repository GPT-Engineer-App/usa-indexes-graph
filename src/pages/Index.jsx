import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Spinner, Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { fetchIndexesData } from '../api/indexes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const [indexesData, setIndexesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchIndexesData();
      setIndexesData(data);
      setLoading(false);
    };
    getData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Major USA Indexes',
      },
    },
  };

  const data = {
    labels: indexesData.map(index => index.name),
    datasets: [
      {
        label: 'Price',
        data: indexesData.map(index => index.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Major USA Indexes</Text>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Box width="100%">
            <Line options={options} data={data} />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;