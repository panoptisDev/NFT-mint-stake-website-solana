import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import Disconnected from '../components/Disconnected'
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"

const Home: NextPage = () => {
  const { connected } = useWallet()

  return (
    <MainLayout>
    <div className={styles.container}>
      <Head>
        <title>Goritoto | NFT Reward & Staking</title>
        <meta name="The NFT Collection for Grim Reapers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "" : "url(/home-background.jpg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />

          <Spacer />
          <Center>{connected ? <Connected /> : <Disconnected />}</Center>
          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/Naswillow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copyright @Naswillow
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
    <MainLayout>
  )
}

export default Home
