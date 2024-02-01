# How to run locally (Kave Version):
1. `copy env.sample .env`, values are ready for local development.
2. `npm install --force`, to install all needed dependencies. Use NPM. Do not use yarn.
3. `docker compose up` to spin up the database and redis services.
4. `npm run dev` to start the server.


# How to deploy to production (Kave Version):
This repository holds the helm chart's custom values we used to deploy self-managed Kutt on Kubernetes.

Also, we are using Terraform to provision a CloudSQL instance for the Kutt database.

## Prerequisites
### service-account.json
At 1Password look for "Terraform Service Account for Kave Tech Services", copy and paste it at the `terrafom/kutt/` folder. Name it `service-account.json`.

Once it is done, `cd` to the `terrafom/kutt/` folder and perform a `terraform init`.

## Apply terraform
```
terraform apply
```
Wait until terraform finish.

Go to GCP on secret manager, view the secret named url_shortener_password and copy the database password to vault k8s/kv/kave-tech-services/url-shortener ->  DATABASE_PASSWORD key.

Go to SQL instances and get the private ip of kutt-url-shortener instance and copy on helm/custom-values.yaml
```
externalPostgresql:
  auth:
    hostname: <Private IP here>
```

## Prepare the namespace to use helm 
Kutt has been deployed in k8s Kave Tech Services' `services-prod` cluster using the official Helm Chart under the `url-shortener` namespace.

If it's first time:
See how to use ssl cert -> [Use Google-managed SSL Cert](https://loop.microsoft.com/p/eyJ3Ijp7InUiOiJodHRwczovL2p1bGlhZ3J1cC5zaGFyZXBvaW50LmNvbS8%2FbmF2PWN6MGxNa1ltWkQxaUlWaHdaemM1ZVVwSU1qQXRlVjlwVldkTVlqRkdkRUZEV0VOUWRXVllha1pLZG1zMlUwSlliMVJDY1ZweFJsYzFUR3RaVkhWUk5FRnpZMkoyVFhGM05Fa21aajB3TVRWTFdGaElObGhVVnpWTlVFcEhWbE5JVGtoTVVFMHlVbEJUV1ZGQ1JFZFpKbU05Sm1ac2RXbGtQVEUlM0QiLCJyIjpmYWxzZX0sInAiOnsidSI6Imh0dHBzOi8vanVsaWFncnVwLnNoYXJlcG9pbnQuY29tLzpmbDovci9jb250ZW50c3RvcmFnZS9DU1BfZjczYjk4NWUtNDcyMi00ZmRiLWIyZmUtMjUyMDJkYmQ0NWI0L2xhJTIwQmlibGlvdGVjYSUyMGRlJTIwZG9jdW1lbnRvcy9Mb29wQXBwRGF0YS9TaW4lMjB0JUMzJUFEdHVsbyUyMDE1Lmxvb3A%2FZD13OTUzYWNmM2QzYzJlNGVhOGIzNjM4NzY5NjUyY2JiZjkmY3NmPTEmd2ViPTEmbmF2PWN6MGxNa1pqYjI1MFpXNTBjM1J2Y21GblpTVXlSa05UVUY5bU56TmlPVGcxWlMwME56SXlMVFJtWkdJdFlqSm1aUzB5TlRJd01tUmlaRFExWWpRbVpEMWlJVmh3WnpjNWVVcElNakF0ZVY5cFZXZE1ZakZHZEVGRFdFTlFkV1ZZYWtaS2RtczJVMEpZYjFSQ2NWcHhSbGMxVEd0WlZIVlJORUZ6WTJKMlRYRjNORWttWmowd01UVkxXRmhJTmxJMVdqUTFTa3RNVWpSV1FraE1SMWswU0U1R1UxTmFUemRhSm1NOUpUSkdKbVpzZFdsa1BURW1ZVDFNYjI5d1FYQndKbkE5SlRRd1pteDFhV1I0SlRKR2JHOXZjQzF3WVdkbExXTnZiblJoYVc1bGNpWjRQU1UzUWlVeU1uY2xNaklsTTBFbE1qSlVNRkpVVlVoNGNXUlhlSEJaVjJSNVpGaEJkV015YUdoamJWWjNZakpzZFdSRE5XcGlNakU0V1dsR1dXTkhZek5QV0d4TFUwUkpkMHhZYkdaaFZsWnVWRWRKZUZKdVVrSlJNV2hFVlVoV2JGZEhjRWRUYmxweVRteE9RMWRIT1ZWUmJrWmhZMVZhV0U1VmVISlhWbEl4VlZSU1FtTXlUbWxrYXpGNFpIcFNTbVpFUVhoT1ZYUlpWMFZuTWxkR1VsaE9WVEZSVTJ0a1YxVXdhRTlUUlhoUlZGUktVMVZHVGxwVlZVcEZVakZySlRORUpUSXlKVEpESlRJeWFTVXlNaVV6UVNVeU1qbG1aR1JoWlRJM0xXRm1NbUV0TkdGaFl5MWhNVGxsTFRBelpURXhNbVJsT0RrMVlTVXlNaVUzUkElM0QlM0QiLCJyIjpmYWxzZX0sImkiOnsiaSI6IjlmZGRhZTI3LWFmMmEtNGFhYy1hMTllLTAzZTExMmRlODk1YSJ9fQ%3D%3D) 

## Now let's use helm 
```
cd helm/url-shortener
```
to install:
```
helm install url-shortener . --namespace url-shortener --values custom-values.yaml --create-namespace
```

to update:
```
helm upgrade url-shortener . --namespace url-shortener --values custom-values.yaml 
```

to uninstall:
```
helm uninstall url-shortener --namespace url-shortener
```

### See the results
First wait until the Google managed cert has been created and ACTIVE. When the cert is ACTIVE, you can go to https://kave.to

# Original Readme:

<p align="center"><a href="https://kutt.it" title="kutt.it"><img src="https://raw.githubusercontent.com/thedevs-network/kutt/9d1c873897c3f5b9a1bd0c74dc5d23f2ed01f2ec/static/images/logo-github.png" alt="Kutt.it"></a></p>

# Kutt.it

**Kutt** is a modern URL shortener with support for custom domains. Shorten URLs, manage your links and view the click rate statistics.

_Contributions and bug reports are welcome._

[https://kutt.it](https://kutt.it)

[![Build Status](https://travis-ci.org/thedevs-network/kutt.svg?branch=v2-beta)](https://travis-ci.org/thedevs-network/kutt)
[![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/thedevs-network/kutt/#contributing)
[![GitHub license](https://img.shields.io/github/license/thedevs-network/kutt.svg)](https://github.com/thedevs-network/kutt/blob/develop/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/thedevs-network/kutt/.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fthedevs-network%2Fkutt%2F)

## Table of Contents

- [How to run locally (Kave Version):](#how-to-run-locally-kave-version)
- [How to deploy to production (Kave Version):](#how-to-deploy-to-production-kave-version)
- [Original Readme:](#original-readme)
- [Kutt.it](#kuttit)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Stack](#stack)
  - [Setup](#setup)
    - [Manual](#manual)
    - [Docker](#docker)
    - [Configuration](#configuration)
  - [Browser Extensions](#browser-extensions)
  - [API](#api)
  - [Integrations](#integrations)
    - [ShareX](#sharex)
    - [Alfred Workflow](#alfred-workflow)
  - [3rd Party packages](#3rd-party-packages)
  - [Donate](#donate)
  - [Contributing](#contributing)

## Key Features

- Free and open source.
- Custom domain support.
- Custom URLs for shortened links
- Set password for links.
- Set description for links.
- Expiration time for links.
- Private statistics for shortened URLs.
- View, edit, delete and manage your links.
- Admin account to view, delete and ban links.
- Ability to disable registration and anonymous link creation for private use.
- RESTful API.

## Stack

- Node (Web server)
- Express (Web server framework)
- Passport (Authentication)
- React (UI library)
- Next (Universal/server-side rendered React)
- Easy Peasy (State management)
- styled-components (CSS styling solution library)
- Recharts (Chart library)
- PostgreSQL (database)
- Redis (Cache layer)

## Setup

### Manual

You need to have [Node.js](https://nodejs.org/), [PostgreSQL](https://www.postgresql.org/) and [Redis](https://redis.io/) installed.

1. Clone this repository or [download the latest zip](https://github.com/thedevs-network/kutt/releases).
2. Copy `.example.env` to `.env` and fill it properly ([see below](#configuration)).
3. Install dependencies: `npm install`.
4. Run for development: `npm run dev`.
5. Run for production: `npm run build` then `npm start`.

### Docker

1. Download the [`docker-compose.yml`](https://raw.githubusercontent.com/thedevs-network/kutt/develop/docker-compose.yml) and the [`.docker.env`](https://raw.githubusercontent.com/thedevs-network/kutt/develop/.docker.env) files.
2. Rename `.docker.env` to `.env` and fill it properly ([see below](#configuration)).
3. To execute Kutt you simply have to run `docker-compose up -d` command and then the app should be ready on port "3000".

The `docker-compose.yml` uses the official kutt docker image available on [Docker Hub](https://hub.docker.com/r/kutt/kutt).

### Configuration

For the minimal configuration the following settings have to be changed in the `.env`-file:

- **DEFAULT_DOMAIN**: The domain of your kutt instance
- **DB_**: The DB credentials (when you use docker-compose you can skip these)
- **ADMIN_EMAILS**: A comma-separated list of the administrator-accounts
- **RECAPTCHA_**: Enter your credentials to use reCaptchas or delete this setting if you don't want to use it
- **MAIL_**: Enter the SMTP-server's credentials (The experience shows SSL works better than STARTTLS; The mail config is required to easily create accounts, see [this comment](https://github.com/thedevs-network/kutt/issues/269#issuecomment-628604256) how it can be done manually)
- **REPORT_EMAIL**: Kutt offers a form to report malicious links which are sent to this mail-address

## Browser Extensions

Download Kutt's extension for web browsers via below links. You can also find the source code on [kutt-extension](https://github.com/abhijithvijayan/kutt-extension).

- [Chrome](https://chrome.google.com/webstore/detail/kutt/pklakpjfiegjacoppcodencchehlfnpd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/kutt/)

## API

Visit API v2 documentation on [docs.kutt.it](https://docs.kutt.it)

## Integrations

### ShareX

You can use Kutt as your default URL shortener in [ShareX](https://getsharex.com/). If you host your custom instance of Kutt, refer to [ShareX wiki](https://github.com/thedevs-network/kutt/wiki/ShareX) on how to setup.

### Alfred Workflow

Download Kutt's official workflow for [Alfred](https://www.alfredapp.com/) app from [alfred-kutt](https://github.com/thedevs-network/alfred-kutt) repository.

## 3rd Party packages
| Language   | Link                                                                              | Description                                        |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| C# (.NET)  | [KuttSharp](https://github.com/0xaryan/KuttSharp)                                 | .NET package for Kutt.it url shortener             |
| C# (.NET)  | [Kutt.NET](https://github.com/AlphaNecron/Kutt.NET)                               | ✂️🔗 C# API Wrapper for Kutt
| Python     | [kutt-cli](https://github.com/RealAmirali/kutt-cli)                               | Command-line client for Kutt written in Python     |
| Ruby       | [kutt.rb](https://github.com/RealAmirali/kutt.rb)                                 | Kutt library written in Ruby                       |
| Rust       | [urlshortener](https://github.com/vityafx/urlshortener-rs)                        | URL shortener library written in Rust              |
| Rust       | [kutt-rs](https://github.com/robatipoor/kutt-rs)                                  | Command line tool written in Rust                  |
| Node.js    | [node-kutt](https://github.com/ardalanamini/node-kutt)                            | Node.js client for Kutt.it url shortener           |
| JavaScript | [kutt-vscode](https://github.com/mehrad77/kutt-vscode)                            | Visual Studio Code extension for Kutt              |
| Java       | [kutt-desktop](https://github.com/cipher812/kutt-desktop)                         | A Cross platform Java desktop application for Kutt |
| Go         | [kutt-go](https://github.com/raahii/kutt-go)                                      | Go client for Kutt.it url shortener                |
| BASH       | [GitHub Gist](https://gist.github.com/hashworks/6d6e4eae8984a5018f7692a796d570b4) | Simple BASH function to access the API             |
| BASH       | [url-shortener](https://git.tim-peters.org/Tim/url-shortener)                     | Simple BASH script with GUI                        |

## Donate

<img src="./btc.png" alt="Kutt.it" width="32px" height="32px">

Kutt is free of charge and free of ads. Help us keep our servers running and motivate us to work on this project by donating to our Bitcoin wallet:

```
1P89WxNTinKxxDQ4FmC4jis3KUdfA9fLJB
```

## Contributing

Pull requests are welcome. You'll probably find lots of improvements to be made.

Open issues for feedback, requesting features, reporting bugs or discussing ideas.

Special thanks to [Thomas](https://github.com/trgwii) and [Muthu](https://github.com/MKRhere). Logo design by [Muthu](https://github.com/MKRhere).

