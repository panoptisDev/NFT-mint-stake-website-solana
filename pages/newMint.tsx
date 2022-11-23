import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Disconnected from "../components/Disconnected"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"
import { Button, Text, HStack } from "@chakra-ui/react";
import { MouseEventHandler, useCallback } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Home: NextPage = () => {
  const { connected } = useWallet()
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(async (event) => {}, []);
  
  return (
    <MainLayout>
    <div className={styles.container}>
      <Head><title>Willows</title><meta name="The NFT Cowllection for Willows" /><link rel="icon" href="/favicon.ico" /></Head>

      <Box w="full" h="calc(100vh)" bgImage={connected ? "" : "url(/home-background.svg)"} backgroundPosition="center">
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />
          <Spacer />
          <Center>{connected ? <Connected /> : <Disconnected />}</Center>
          <Spacer />
          <Center>
            <Box marginBottom={4} color="white">
              <a href="https://twitter.com/_buildspace" target="_blank" rel="noopener noreferrer">
                Built By @Naswillow
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
    <Image src="" alt="" /><Button bgColor="accent" color="white" maxWidth="380px" onClick={handleClick}>
    <HStack>
      <Text>stake my buildoor</Text>
        <ArrowForwardIcon />
    </HStack>
    </Button>
    </MainLayout>
  );
};

export default Home
