npx cpx 'assets/**/*' 'build/assets' --watch &
npx cpx 'declarations/*.lua' 'build/libraries' --watch &
npx tstl -p .\tsconfig.json --watch