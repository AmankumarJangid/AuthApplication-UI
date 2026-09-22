import { useEffect, useRef, useState, type FormEvent } from "react"
import { useLocation, useNavigate } from  "react-router"
import { ArrowRight, CheckCircle2, MailCheck, ShieldCheck, KeyRound, UserCheck } from "lucide-react"
import { setLoading, selectIsLoading } from "@/redux/slices/appSlice"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useDispatch, useSelector } from "react-redux"
import type { SendOtpRequest, OtpStatePayload, OtpPurpose } from "@/utils/handleAuthRequeset"
import { handleSendOtp, handleVerifyOtp, handleRegister } from "@/utils/handleAuthRequeset"


export function OtpForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  // Safely cast route state
  const state = location.state as OtpStatePayload | null
  const flow = state?.flow
  const flowData = state?.data
  const safeEmail = flowData?.email ?? ""
  const safeUsername = flowData?.username ?? ""
  const safePassword = flowData?.password ?? ""

  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(60)

  const hasTriggeredRef = useRef(false);

  // Helper function to send OTP
  const triggerOtp = async (targetEmail: string, targetFlow: OtpPurpose) => {
    dispatch(setLoading(true)) // Fixed: Dispatch Redux action

    
    const success = await handleSendOtp({
      email: targetEmail,
      purpose: targetFlow,
    } as SendOtpRequest)

    dispatch(setLoading(false)) // Fixed: Dispatch Redux action
    if (success) {
      setOtpSent(true)
    }
    else{
      alert( "Unable to send otp ");
      navigate("/auth/login" , {replace : true})
    }
  }

  // Security Guard: Kick user back if they directly enter the URL without routing state
  // 1. Initial Mount Hook: Route Guard & Send Initial OTP
  useEffect(() => {
    if (!flow || !flowData || !safeEmail) {
      navigate("/auth/login", { replace: true })
      return
    }

    // Prevent duplicate execution in React 18 Strict Mode
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    // Trigger initial OTP send
    triggerOtp(safeEmail, flow)
  }, [flow, flowData, safeEmail, navigate])

  // 2. Cooldown Timer Hook
  useEffect(() => {
    if (cooldownSeconds <= 0) return

    const timer = window.setTimeout(() => {
      setCooldownSeconds((previous) => Math.max(0, previous - 1))
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [cooldownSeconds])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const canResend = cooldownSeconds === 0

  // Dynamic UI content map based on active flow type
  const getFlowContent = () => {
    switch (flow) {
      case "PASSWORD_RESET":
        return {
          title: "Reset your password",
          icon: <KeyRound className="size-7" />,
          footer: "Secure password reset verification",
        }
      case "TWO_FACTOR_AUTH":
        return {
          title: "Two-Factor authentication",
          icon: <ShieldCheck className="size-7" />,
          footer: "Secure 2FA identity check",
        }
      case "REGISTRATION":
      default:
        return {
          title: "Verify your email",
          icon: <UserCheck className="size-7" />,
          footer: "Secure verification for your new account",
        }
    }
  }

  const uiContent = getFlowContent()

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault()
    if (otp.length !== 6 || !flow || !safeEmail) return

    setIsVerifying(true)

    try {
      const response = await handleVerifyOtp({
        email: safeEmail,
        purpose: flow,
        otp: otp,
      })

      if (response) {
        switch (flow) {
          case "REGISTRATION": {
            await handleRegister({
              email: safeEmail,
              password: safePassword,
              username: safeUsername,
            })
            navigate("/")
            break
          }

          case "PASSWORD_RESET":
            navigate("/new-password", {
              state: { email: safeEmail, token: otp },
            })
            break

          case "TWO_FACTOR_AUTH":
            navigate("/")
            break
        }
      }
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!canResend || !flow || !safeEmail) return

    setIsResending(true)
    setOtp("")

    try {
      await triggerOtp(safeEmail, flow)
      setCooldownSeconds(60)
    } catch (error) {
      console.error("Failed to resend code:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border border-border/60 bg-card/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          {uiContent.icon}
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
          {uiContent.title}
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="font-medium text-foreground">{flowData?.email || "your email"}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              containerClassName="gap-2"
              className="justify-center"
            >
              <InputOTPGroup className="gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-11 rounded-xl border border-border bg-background text-lg font-semibold shadow-sm transition-all data-[active=true]:border-primary data-[active=true]:ring-3 data-[active=true]:ring-primary/10"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MailCheck className="size-4 text-primary" />
              <span>
                {canResend
                  ? "You can request a new code now"
                  : `Resend available in ${formatTime(cooldownSeconds)}`}
              </span>
            </div>

            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-medium text-primary transition hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isResending || !canResend}
            >
              {isResending ? "Sending..." : canResend ? "Resend code" : "Wait"}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full gap-2 rounded-xl text-base font-medium shadow-sm"
            disabled={otp.length !== 6 || isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify & continue"}
            {!isVerifying && <ArrowRight className="size-4" />}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-emerald-500" />
          {uiContent.footer}
        </div>
      </CardContent>
    </Card>
  )
}
