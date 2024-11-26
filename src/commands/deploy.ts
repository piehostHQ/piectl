import {Args, Command, Flags} from '@oclif/core'
import fs from 'fs'
import readline from 'readline'
import prompt from 'prompt'
import axios from 'axios'
import {execSync} from 'child_process'
import {select, Separator} from '@inquirer/prompts'

const apiHostProd = `https://piehost.com/api/v4`
const apiHostDev = `http://piehost.test/api/v4`

const apiHost = apiHostDev

const projectDir = `/Users/sudoanand/Sites/samples/react-sample-private`
const pieHostDir = `${projectDir}/.piehost`
const deployConfigFile = `${pieHostDir}/deploy.json`

export default class Deploy extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }

  static override description = 'describe the command here'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  async catch(error: any) {
    // do something or
    // re-throw to be handled globally
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Deploy)

    const name = flags.name ?? 'world'

    prompt.message = ''
    prompt.start()

    try {
      if (!fs.existsSync(pieHostDir) || !fs.existsSync(deployConfigFile)) {
        this.initializeProject()
      } else {
        this.deploy()
      }
    } catch (e) {}
  }

  public async deploy() {
    console.log('\n')
    console.log(`Make sure you have pushed the changes on git`)
    console.log(`Lastest changes from git will be deployed`)
    console.log(`If you have configured webhook, there is no need to run this command`)
    console.log(`You can see all deployments at https://pie.host`)
    console.log('\n')
    var authToken: string = await this.authenticate()
    var projectId = this.getProjectConfig('uuid')

    var deploy = await this.doDeploy(authToken, projectId, null, null)
    if (deploy.id) {
      this.log(`Project deployment is scheduled!`)
      this.log(`New changes should be available soon, depending upon build time of your project.`)
      this.log(`\n`)
    } else {
      console.log(`Something went wrong, please contact us https://pie.host/contact`)
    }
  }

  public async doDeploy(authToken: any, uuid: any, build_command: any, public_directory: any) {
    var deployLog = await this.post(
      `/pieapp/${uuid}/deploy`,
      {
        build_command,
        public_directory,
      },
      authToken,
    )

    return deployLog
  }

  public async createPieApp(name: any, git: any, size: any, build_command: any, public_directory: any) {
    try {
      var authToken: string = await this.authenticate()
      var sshKey = await this.get('/pieapp/sshkey', authToken)

      const {isprivate} = await prompt.get({
        properties: {
          isprivate: {
            message: 'Is your git project private? y/n',
            required: true,
          },
        },
      })

      if (isprivate == 'y') {
        console.log('\n')
        console.log('Add following deploy key in your git repository\n')
        console.log(sshKey.public_key)
        console.log('\n')
        const {configkey} = await prompt.get({
          properties: {
            configkey: {
              message: 'Hit enter after adding the deploy key to continue',
            },
          },
        })
      }

      var pieApp = await this.post(
        '/pieapp',
        {
          name,
          git,
          keyId: sshKey.id,
          size,
        },
        authToken,
      )

      if (pieApp.uuid) {
        //Build
        this.saveProjectConfig(pieApp.uuid)
        this.deployNew(pieApp, build_command, public_directory, pieApp.uuid, authToken)
      }
    } catch (e: any) {
      this.log('Something went wrong!')
      if (e.response && e.response.data && e.response.data.message) {
        this.log(e.response.data.message)
      } else {
        this.log(e)
      }
    }
  }

  public getProjectConfig(key: any) {
    var config: any = JSON.parse(fs.readFileSync(deployConfigFile).toString())
    return config[key]
  }

  public async saveProjectConfig(uuid: any) {
    var deployConfig: any = {
      version: 1,
      uuid,
    }

    fs.writeFileSync(deployConfigFile, JSON.stringify(deployConfig))
  }

  public async deployNew(pieApp: any, build_command: any, public_directory: any, uuid: any, authToken: any) {
    var deployLog = await this.doDeploy(authToken, uuid, build_command, public_directory)

    if (deployLog.id) {
      console.log('\n')
      console.log(`Congratulations! Your project has been deployed!`)
      console.log('\n')
      console.log(`In few minutes it should be available at: https://${pieApp.subdomain}.pie.host`)
      console.log(`You can manage it from here: https://piehost.com/app/v4/pieapp/${pieApp.uuid}`)
      console.log('\n')
      console.log('Visit pie.host or the URL above and configure git webhook for auto-deployments on git push')
      console.log(`or run  "pie deploy" to deploy your changes!`)
      console.log('\n')
      console.log(`Problems? chat with us https://pie.host/contact`)
    }
  }

  public async initializeProject() {
    this.log('Initializing project...')

    const answer = await select({
      message: 'Deploy new PieApp?',
      choices: [
        {
          value: 'new',
          name: 'This is a new project',
        },
        {
          value: 'existing',
          name: 'I have deployed this project on PieHost already',
        },
      ],
    })

    fs.mkdir(pieHostDir, () => {
      var gitUrl = execSync(`cd ${projectDir} && git config --get remote.origin.url`).toString().trim()
      var projectNameComponents = projectDir.split('/')
      var projectName = 'myapp'

      try {
        var projectName = projectNameComponents[projectNameComponents.length - 1]
      } catch (e) {}

      var schema = {
        properties: {
          name: {
            message: 'Project name',
            required: true,
            default: projectName,
          },
          git: {
            message: 'Git URL (press enter to continue, or type correct one)\n',
            required: true,
            default: gitUrl,
          },
          publicdir: {
            message: 'Public directory, please re-check this before you continue. It could be /build or /dist',
            required: true,
            default: '/',
          },
          buildcommandneeded: {
            message: 'Build command required? y/n',
            required: true,
            default: '',
          },
        },
      }

      prompt.get(schema, async (_err: any, result: any) => {
        var bcommand: any = ''
        if (result.buildcommandneeded == 'y' || result.buildcommandneeded == 'Y') {
          const {buildcommand} = await prompt.get({
            properties: {
              buildcommand: {
                message: 'Build command',
                required: true,
                default: 'npm run build',
              },
            },
          })
          bcommand = buildcommand
        }

        try {
          const plans: any = await this.get('/pieapp/plans', null)
          const answer = await select({
            message: 'Select a plan',
            choices: plans,
          })

          const selectedPlan = answer

          this.createPieApp(result.name, result.git, answer, bcommand, result.publicdir)
        } catch (e: any) {
          this.log(e)
          this.log('Something went wrong, are you connected to internet?')
        }

        // fs.writeFileSync(deployConfigFile, JSON.stringify(deployConfig))
      })
    })
  }

  public async authenticate(): Promise<string> {
    return new Promise((resolve, reject) => {
      var schema = {
        properties: {
          email: {
            message: 'Pie.host email',
            required: true,
          },
          password: {
            message: 'Pie.host password',
            hidden: true,
            required: true,
          },
        },
      }

      this.log('Authenticating...')
      this.log('This is required everytime  your deploy, for security.')
      prompt.get(schema, (_err: any, result: {email: string; password: string}) => {
        this.post(
          '/login',
          {
            email: result.email,
            password: result.password,
          },
          null,
        )
          .then((res: any) => {
            if (res.success) {
              resolve(res.auth)
            } else {
              reject(`Auth failed: please recheck credentials`)
            }
          })
          .catch((error) => {
            reject(`Auth failed: ${error.message}`)
          })
      })
    })
  }

  public async get(path: string, authToken: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      let config = {
        method: 'get',
        url: `${apiHost}${path}`,
        headers: headers,
      }

      axios
        .request(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public async post(path: string, payload: object, authToken: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(payload)
      let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      let config = {
        method: 'post',
        url: `${apiHost}${path}`,
        headers: headers,
        data: data,
      }

      axios
        .request(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
