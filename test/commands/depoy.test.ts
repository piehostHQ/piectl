import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('depoy', () => {
  it('runs depoy cmd', async () => {
    const {stdout} = await runCommand('depoy')
    expect(stdout).to.contain('hello world')
  })

  it('runs depoy --name oclif', async () => {
    const {stdout} = await runCommand('depoy --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
