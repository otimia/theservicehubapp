'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check as CheckIcon, Zap, Building } from 'lucide-react'

// Placeholder function for Stripe checkout
const stripeCheckout = async (plan: string) => {
    // In a real application, this would redirect to Stripe
    console.log(`Redirecting to Stripe checkout for ${plan} plan`)
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    return true
}

export default function OnboardingForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        workspaceName: '',
        category: '',
        employees: '',
        role: '',
        plan: ''
    })

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.workspaceName.length > 0
            case 2:
                return formData.category && formData.employees && formData.role
            case 3:
                return ['free', 'freelance', 'business'].includes(formData.plan)
            default:
                return true
        }
    }

    const handleNext = async () => {
        if (isStepValid()) {
            if (step === 3) {
                if (formData.plan === 'free') {
                    // Onboarding complete for free plan
                    alert('Onboarding complete! Welcome to your free plan.')
                } else {
                    // Redirect to Stripe checkout for paid plans
                    const success = await stripeCheckout(formData.plan)
                    if (success) {
                        alert(`Onboarding complete! Welcome to your ${formData.plan} plan.`)
                    }
                }
            } else {
                setStep(prev => prev + 1)
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Onboarding</h1>
                <p className="text-muted-foreground">Complete the steps below to set up your account.</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>

            {/* Step 1: Workspace */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Create your workspace</h2>
                    <div className="space-y-2">
                        <Label htmlFor="workspace-name">Workspace name</Label>
                        <Input
                            id="workspace-name"
                            value={formData.workspaceName}
                            onChange={(e) => updateFormData('workspaceName', e.target.value)}
                            placeholder="Enter your workspace name"
                        />
                    </div>
                </div>
            )}

            {/* Step 2: Extra Information */}
            {step === 2 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Tell us more about your business</h2>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => updateFormData('category', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="employees">Number of employees</Label>
                        <Select onValueChange={(value) => updateFormData('employees', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select number of employees" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1-10">1-10</SelectItem>
                                <SelectItem value="11-50">11-50</SelectItem>
                                <SelectItem value="51-200">51-200</SelectItem>
                                <SelectItem value="201-500">201-500</SelectItem>
                                <SelectItem value="500+">500+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Your role</Label>
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => updateFormData('role', e.target.value)}
                            placeholder="Enter your role"
                        />
                    </div>
                </div>
            )}

            {/* Step 3: Choose Plan */}
            {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: 'Free', icon: CheckIcon, description: 'Perfect for individuals', price: '€0/month' },
                        { name: 'Freelance', icon: Zap, description: 'Great for freelancers', price: '€19/month' },
                        { name: 'Business', icon: Building, description: 'Ideal for small businesses', price: '€49/month' }
                    ].map((plan) => (
                        <Card
                            key={plan.name.toLowerCase()}
                            className={`cursor-pointer transition-all ${formData.plan === plan.name.toLowerCase() ? 'border-primary' : ''}`}
                            onClick={() => updateFormData('plan', plan.name.toLowerCase())}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <plan.icon className="h-5 w-5" />
                                    {plan.name}
                                </CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{plan.price}</p>
                            </CardContent>
                            <CardFooter>
                                {formData.plan === plan.name.toLowerCase() && (
                                    <p className="text-sm text-primary">Selected</p>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <Button onClick={handleNext} disabled={!isStepValid()}>
                {step === 3 ? 'Complete' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}