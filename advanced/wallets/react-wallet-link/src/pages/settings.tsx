import PageHeader from '@/components/PageHeader'
import RelayRegionPicker from '@/components/RelayRegionPicker'
import SettingsStore from '@/store/SettingsStore'
import { eip155Wallets } from '@/utils/EIP155WalletUtil'
import { Card, Col, Divider, Row, Switch, Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'
import packageJSON from '../../package.json'

export default function SettingsPage() {
  const {
    testNets,
    smartAccountSponsorshipEnabled,
    eip155Address,
    smartAccountEnabled,
    kernelSmartAccountEnabled,
    safeSmartAccountEnabled,
    biconomySmartAccountEnabled
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="Settings" />

      <Text h4 css={{ marginBottom: '$5' }}>
        Packages
      </Text>
      <Row justify="space-between" align="center">
        <Text color="$gray400">@walletconnect/sign-client</Text>
        <Text color="$gray400">{packageJSON.dependencies['@walletconnect/web3wallet']}</Text>
      </Row>

      <Divider y={2} />

      <Text h4 css={{ marginBottom: '$5' }}>
        Testnets
      </Text>
      <Row justify="space-between" align="center">
        <Switch
          checked={testNets}
          onChange={SettingsStore.toggleTestNets}
          data-testid="settings-toggle-testnets"
        />
        <Text>{testNets ? 'Enabled' : 'Disabled'}</Text>
      </Row>

      <Divider y={2} />

      <Row>
        <Col>
          <Text h4 css={{ marginBottom: '$5' }}>
            Smart Accounts
          </Text>
          {testNets ? (
            <>
              <Row justify="space-between" align="center">
                <Switch
                  checked={smartAccountEnabled}
                  onChange={SettingsStore.toggleSmartAccountEnabled}
                  data-testid="settings-toggle-smart-account-enabled"
                />
                <Text>{smartAccountEnabled ? 'Enabled' : 'Disabled'}</Text>
              </Row>

              {smartAccountEnabled ? (
                <>
                  <Text h4 css={{ marginBottom: '$5', marginTop: '$5' }}>
                    ZeroDev Smart Account
                  </Text>
                  <Row justify="space-between" align="center">
                    <Switch
                      checked={kernelSmartAccountEnabled}
                      onChange={SettingsStore.toggleKernelSmartAccountsEnabled}
                      data-testid="settings-toggle-smart-account-sponsorship"
                    />
                    <Text>{kernelSmartAccountEnabled ? 'Enabled' : 'Disabled'}</Text>
                  </Row>

                  <Text h4 css={{ marginBottom: '$5', marginTop: '$5' }}>
                    Safe Smart Account
                  </Text>
                  <Row justify="space-between" align="center">
                    <Switch
                      checked={safeSmartAccountEnabled}
                      onChange={SettingsStore.toggleSafeSmartAccountsEnabled}
                      data-testid="settings-toggle-smart-account-sponsorship"
                    />
                    <Text>{safeSmartAccountEnabled ? 'Enabled' : 'Disabled'}</Text>
                  </Row>

                  <Text h4 css={{ marginBottom: '$5', marginTop: '$5' }}>
                    Biconomy Smart Account
                  </Text>
                  <Row justify="space-between" align="center">
                    <Switch
                      checked={biconomySmartAccountEnabled}
                      onChange={SettingsStore.toggleBiconomySmartAccountsEnabled}
                      data-testid="settings-toggle-smart-account-sponsorship"
                    />
                    <Text>{biconomySmartAccountEnabled ? 'Enabled' : 'Disabled'}</Text>
                  </Row>

                  <Text h4 css={{ marginBottom: '$5', marginTop: '$5' }}>
                    Sponsorship (Pimlico)
                  </Text>
                  <Row justify="space-between" align="center">
                    <Switch
                      checked={smartAccountSponsorshipEnabled}
                      onChange={SettingsStore.toggleSmartAccountSponsorship}
                      data-testid="settings-toggle-smart-account-sponsorship"
                    />
                    <Text>{smartAccountSponsorshipEnabled ? 'Enabled' : 'Disabled'}</Text>
                  </Row>
                </>
              ) : null}
            </>
          ) : (
            <Text color="$gray400">This feature requires testnets</Text>
          )}
        </Col>
      </Row>

      <Divider y={2} />

      <Row justify="space-between" align="center">
        <Text h4 css={{ marginBottom: '$5' }}>
          Relayer Region
        </Text>
        <RelayRegionPicker />
      </Row>

      <Divider y={2} />

      <Text css={{ color: '$yellow500', marginBottom: '$5', textAlign: 'left', padding: 0 }}>
        Warning: mnemonics and secret keys are provided for development purposes only and should not
        be used elsewhere!
      </Text>

      <Text h4 css={{ marginTop: '$5', marginBottom: '$5' }}>
        EIP155 Mnemonic
      </Text>
      <Card bordered borderWeight="light" css={{ minHeight: '100px' }}>
        <Text css={{ fontFamily: '$mono' }}>{eip155Wallets[eip155Address].getMnemonic()}</Text>
      </Card>



      <Text h4 css={{ marginTop: '$10', marginBottom: '$5' }}></Text>
    </Fragment>
  )
}
