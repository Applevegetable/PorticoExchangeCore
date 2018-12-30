// tslint:disable:max-line-length
import { expect } from 'chai';
import { fromBase58 } from 'bip32';
import { getHexBuffer } from '../../../lib/Utils';
import { OutputType } from '../../../lib/consts/Enums';
import { constructClaimTransaction } from '../../../lib/swap/Claim';

// TODO: use valid values
describe('Claim', () => {
  const preimage = getHexBuffer('b5b2dbb1f0663878ecbc20323b58b92c');
  const keys = fromBase58('xprv9xgxR6htMdXUXGipynZp1janNrWNYJxaz2o4tH9fdtZqcF26BX5VB88GSM5KgZHWCyAyb8FZpQik2UET84CHfGWXFMG5zWWjmtDMgqYuo19');
  const redeemScript = getHexBuffer('a914a0738c92fde6361f09d28950c7bd0d2bf32b34be87632103be4a251dae719d565ce1d6a7a5787df99fc1ecc1f6e847567981a686f32abce167027802b1752103f7877d4ae985bb30b6f150ad6b6b9935c342432beed1a4781347b169c1e2417368ac');
  const destinationScript = getHexBuffer('00140000000000000000000000000000000000000000');

  const utxo = {
    txHash: getHexBuffer('285d227e2823c679c224b4d562a9b5b5b7b927badd483df9f4225c6fc761d754'),
    vout: 0,
    value: 2000,
  };

  it('should claim a P2WSH swap', () => {
    const testData = {
      args: {
        utxo: {
          ...utxo,
          type: OutputType.Bech32,
          script: getHexBuffer('00206f38b6ce82427d4df080a9833d06cc6c66ab816545c9fd4df50f9d1ca8430b9e'),
        },
      },
      result: '01000000000101285d227e2823c679c224b4d562a9b5b5b7b927badd483df9f4225c6fc761d7540000000000ffffffff014d070000000000001600140000000000000000000000000000000000000000034730440220656eb1b9e3d3a0af0af0c018f5d9038b64dd86041209102a0d7b4b84f845b75302203bf6c2057cc68abf6a84da806fec7984d773557de322eef1d1b82e4bb34792a80110b5b2dbb1f0663878ecbc20323b58b92c64a914a0738c92fde6361f09d28950c7bd0d2bf32b34be87632103be4a251dae719d565ce1d6a7a5787df99fc1ecc1f6e847567981a686f32abce167027802b1752103f7877d4ae985bb30b6f150ad6b6b9935c342432beed1a4781347b169c1e2417368ac00000000',
    };

    const result = constructClaimTransaction(
      {
        preimage,
        keys,
        redeemScript,
      },
      testData.args.utxo,
      destinationScript,
    );

    expect(result.toHex()).to.be.equal(testData.result);
  });

  it('should claim a P2SH swap', () => {
    const testData = {
      args: {
        utxo: {
          ...utxo,
          type: OutputType.Legacy,
          script: getHexBuffer('a9148f439aff651860bdb28c66500c6e958cfbe7a69387'),
        },
      },
      result: '0100000001285d227e2823c679c224b4d562a9b5b5b7b927badd483df9f4225c6fc761d75400000000bf473044022026f3dae5c1c82ec82976acb8ff59b48c69940ae7c400c8faf8f583ea6d0f82f3022033cf14a6e7ccadc17df394ffa37fbc93d9218f409b038e2f6251b6e1dec655b30110b5b2dbb1f0663878ecbc20323b58b92c4c64a914a0738c92fde6361f09d28950c7bd0d2bf32b34be87632103be4a251dae719d565ce1d6a7a5787df99fc1ecc1f6e847567981a686f32abce167027802b1752103f7877d4ae985bb30b6f150ad6b6b9935c342432beed1a4781347b169c1e2417368acffffffff01be06000000000000160014000000000000000000000000000000000000000000000000',
    };

    const result = constructClaimTransaction(
      {
        preimage,
        keys,
        redeemScript,
      },
      testData.args.utxo,
      destinationScript,
    );

    expect(result.toHex()).to.be.equal(testData.result);
  });

  it('should claim a P2SH nested P2WSH swap', () => {
    const testData = {
      args: {
        utxo: {
          ...utxo,
          type: OutputType.Compatibility,
          script: getHexBuffer('a9143cdeb56e328a10d3bfe107fd5a16bd73871adb8d87'),
        },
      },
      result: '01000000000101285d227e2823c679c224b4d562a9b5b5b7b927badd483df9f4225c6fc761d75400000000232200206f38b6ce82427d4df080a9833d06cc6c66ab816545c9fd4df50f9d1ca8430b9effffffff012a07000000000000160014000000000000000000000000000000000000000003483045022100ac9251c4d2e67f416d5ecb5e4033996fc7fd07c340349b634a0eb6013596dcdb02205ec8bbea731eec9977ab52e80fc1f90248960298db02b07d64b93e1378ef97ed0110b5b2dbb1f0663878ecbc20323b58b92c64a914a0738c92fde6361f09d28950c7bd0d2bf32b34be87632103be4a251dae719d565ce1d6a7a5787df99fc1ecc1f6e847567981a686f32abce167027802b1752103f7877d4ae985bb30b6f150ad6b6b9935c342432beed1a4781347b169c1e2417368ac00000000',
    };

    const result = constructClaimTransaction(
      {
        preimage,
        keys,
        redeemScript,
      },
      testData.args.utxo,
      destinationScript,
    );

    expect(result.toHex()).to.be.equal(testData.result);
  });
});
