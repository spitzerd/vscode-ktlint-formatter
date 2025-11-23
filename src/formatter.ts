import * as child_process from "child_process";

/**
 * Format Kotlin code using ktlint.
 *
 * @param code - The Kotlin source code to format
 * @param ktlintPath - Path to the ktlint executable
 * @param logger - Optional logger function
 * @returns The formatted code
 */
export async function formatKotlinCode(
  code: string,
  ktlintPath: string,
  logger: (message: string) => void = () => {}
): Promise<string> {
  try {
    logger(`Running ktlint: ${ktlintPath}`);

    // Execute ktlint in stdin/stdout mode with --log-level=error to suppress INFO logs
    const result = await new Promise<string>((resolve, reject) => {
      const process = child_process.spawn(
        ktlintPath,
        ["--format", "--stdin", "--log-level=error"],
        {
          stdio: ["pipe", "pipe", "pipe"],
        }
      );

      let stdout = "";
      let stderr = "";

      process.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      process.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      process.on("close", (exitCode) => {
        logger(`ktlint finished with exit code: ${exitCode}`);
        if (stderr) {
          logger(`ktlint stderr:\n${stderr}`);
        }

        // Remove ktlint log lines from stdout
        // ktlint outputs logs like: "15:02:40.431 [main] INFO ..." or "Enable default patterns..."
        const lines = stdout.split("\n");
        const cleanedLines = lines.filter((line) => {
          // Strip ANSI color codes for checking
          // eslint-disable-next-line no-control-regex
          const plainLine = line.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "");

          // Filter out log lines
          if (
            plainLine.includes("[main] INFO") ||
            plainLine.includes("[main] WARN") ||
            plainLine.includes("[main] ERROR") ||
            plainLine.includes("Enable default patterns") ||
            /^\d{2}:\d{2}:\d{2}\.\d{3}\s+\[/.test(plainLine) // Timestamp pattern like 15:02:40.431 [
          ) {
            logger(`[Filtered Log] ${plainLine}`);
            return false;
          }
          return true;
        });

        const cleanStdout = cleanedLines.join("\n");

        // Check if there's a parsing error in stderr
        const hasParsingError =
          stderr.includes("Not a valid Kotlin file") ||
          stderr.includes("Can not parse input");

        if (hasParsingError && !cleanStdout) {
          // Critical parsing error with no output
          const firstError = stderr.split("\n")[0];
          logger(`Parsing error detected: ${firstError}`);
          reject(new Error(`Invalid Kotlin syntax: ${firstError}`));
        } else if (cleanStdout) {
          // ktlint may return exit code 1 even when formatting succeeds
          // if there are lint errors that cannot be auto-corrected.
          // Use the formatted output if available.
          logger(
            `Formatting successful (content length: ${cleanStdout.length})`
          );
          resolve(cleanStdout);
        } else if (exitCode === 0 && !hasParsingError) {
          // Empty output but successful exit code - return original code
          logger(
            `Formatting returned empty output with exit code 0. Returning original code.`
          );
          resolve(code);
        } else {
          // Other errors
          const errorMsg = stderr || "Unknown formatting error";
          logger(`Formatting failed: ${errorMsg}`);
          reject(new Error(`Formatting failed: ${errorMsg}`));
        }
      });

      process.on("error", (err) => {
        logger(`Process error: ${err}`);
        reject(err);
      }); // Write input code to stdin
      process.stdin.write(code);
      process.stdin.end();
    });

    return result;
  } catch (error) {
    throw new Error(`Error formatting code: ${error}`);
  }
}
