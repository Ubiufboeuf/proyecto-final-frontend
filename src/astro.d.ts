/* eslint-disable @typescript-eslint/consistent-type-imports */
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    isAuth: boolean
    isLoadingAuth: boolean
    user: import('src/env').User
  }
}
