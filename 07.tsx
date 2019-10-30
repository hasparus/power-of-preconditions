import React, { useEffect, ComponentProps } from "react";
import {
  render,
  Color,
  Text,
  Box,
  BoxProps,
  useInput,
} from "ink";

import { useStore } from "./07.store";
import { AssertionError } from "assert";

// #region UserProfile

// TS3.6 assert
function assert(condition: any, message?: string): void {
  if (!condition) {
    throw new AssertionError({ message });
  }
}

// // TS3.7 assert
// function assert(condition: any, message?: string): asserts condition {
// 	if (!condition) {
// 			throw new AssertionError({ message })
// 	}
// }

function UserProfile(props: BoxProps) {
  const user = useStore(s => s.user);

  assert(
    user,
    "user should be logged in when rendering UserDetails"
  );

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...props}
    >
      {/* (╯‵□′)╯︵┻━┻ */}
      {/* Object is possibly 'undefined'.ts(2532) */}
      <Box marginBottom={1}>{user.avatar}</Box>
      <Color green>{user.name}</Color>
      <Color green>
        <Text underline>{user.social}</Text>
      </Color>
    </Box>
  );
}

// #endregion UserProfile

function App() {
  const {
    user,
    actions: { login },
  } = useStore();

  useEffect(() => {
    login();
  }, [login]);

  useInput(input => {
    if (input === "q") {
      unmount();
    }
  });

  return (
    <Box flexDirection="column">
      {user ? (
        // Imagine it's deeply nested
        // and we can't just pass user
        // in props to UserProfile
        <UserProfile marginTop={1} />
      ) : (
        <Color blue>Logging in...</Color>
      )}
      <Box marginY={1}>
        <Text>Press "q" to quit</Text>
      </Box>
    </Box>
  );
}

const { unmount } = render(<App />);
