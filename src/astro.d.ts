/* eslint-disable @typescript-eslint/consistent-type-imports */
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    isAuth: boolean
    isLoading: boolean
    user: import('src/env').User
  }
}
