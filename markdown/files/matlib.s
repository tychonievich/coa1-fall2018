	.text

############################################################
##        product routine (multiplies using add)          ##
############################################################

	.globl	product
product:

	# TO DO: write this function
	
	xorq	%rax, %rax
	retq

############################################################
##                 end of product routine                 ##
############################################################



############################################################
##        power routine (exponent using product)          ##
############################################################

	.globl	power
power:

	# TO DO: write this function

	xorq	%rax, %rax
	retq

############################################################
##                  end of power routine                  ##
############################################################




############################################################
	.globl	printNum
printNum:

	pushq	%r15
	pushq	%r14
	pushq	%r12
	pushq	%rbx
	subq	$24, %rsp
	movq	%fs:40, %rax
	movq	%rax, 16(%rsp)
	movb	$48, 15(%rsp)
	testq	%rdi, %rdi
	je	.LBB0_9

	movq	%rdi, %r14
	movabsq	$1000000000000000, %rbx
	cmpq	%rbx, %rdi
	jae	.LBB0_5

	movabsq	$-3689348814741910323, %rsi
.LBB0_3:
	movq	%rbx, %rcx
	movq	%rbx, %rax
	mulq	%rsi
	movq	%rdx, %rbx
	shrq	$3, %rbx
	cmpq	%r14, %rbx
	ja	.LBB0_3

	cmpq	$10, %rcx
	jb	.LBB0_7
.LBB0_5:
	movabsq	$-3689348814741910323, %r12
	leaq	15(%rsp), %r15
.LBB0_6:
	xorl	%edx, %edx
	movq	%r14, %rax
	divq	%rbx
	movq	%rax, %rcx
	mulq	%r12
	shrl	$2, %edx
	andl	$-2, %edx
	leal	(%rdx,%rdx,4), %eax
	subl	%eax, %ecx
	orb	$48, %cl
	movb	%cl, 15(%rsp)
	movl	$1, %edi
	movl	$1, %edx
	movq	%r15, %rsi
	callq	write
	movq	%rbx, %rax
	mulq	%r12
	shrq	$3, %rdx
	cmpq	$9, %rbx
	movq	%rdx, %rbx
	ja	.LBB0_6
	jmp	.LBB0_7
.LBB0_9:
	leaq	15(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write@PLT
.LBB0_7:
	movb	$10, 15(%rsp)
	leaq	15(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write@PLT
	movq	%fs:40, %rax
	cmpq	16(%rsp), %rax
	jne	.LBB0_8

	addq	$24, %rsp
	popq	%rbx
	popq	%r12
	popq	%r14
	popq	%r15
	retq
.LBB0_8:
	callq	__stack_chk_fail@PLT
############################################################




############################################################
	.globl	main
main:

	pushq	%rbp
	pushq	%r15
	pushq	%r14
	pushq	%r13
	pushq	%r12
	pushq	%rbx
	subq	$24, %rsp
	movq	%fs:40, %rax
	movq	%rax, 16(%rsp)
	leaq	.L.str(%rip), %rsi
	movl	$1, %edi
	movl	$9, %edx
	callq	write@PLT
	movb	$48, 13(%rsp)
	movb	$48, %al
	xorl	%r14d, %r14d
	leaq	13(%rsp), %rbx
.LBB1_1:
	movsbq	%al, %rax
	leaq	(%r14,%r14,4), %rcx
	leaq	(%rax,%rcx,2), %r14
	addq	$-48, %r14
	xorl	%edi, %edi
	movl	$1, %edx
	movq	%rbx, %rsi
	callq	read
	movzbl	13(%rsp), %eax
	cmpb	$10, %al
	jne	.LBB1_1

	leaq	.L.str.1(%rip), %rsi
	xorl	%r15d, %r15d
	xorl	%edi, %edi
	movl	$9, %edx
	callq	write
	movb	$48, 13(%rsp)
	movb	$48, %al
	leaq	13(%rsp), %rbx
.LBB1_3:
	movsbq	%al, %rax
	leaq	(%r15,%r15,4), %rcx
	leaq	(%rax,%rcx,2), %r15
	addq	$-48, %r15
	xorl	%edi, %edi
	movl	$1, %edx
	movq	%rbx, %rsi
	callq	read
	movzbl	13(%rsp), %eax
	cmpb	$10, %al
	jne	.LBB1_3

	movabsq	$1000000000000000, %r13
	movq	%r14, %rdi
	movq	%r15, %rsi
	callq	product
	movq	%rax, %r12
	leaq	.L.str.2(%rip), %rsi
	movl	$1, %edi
	movl	$8, %edx
	callq	write
	movb	$48, 14(%rsp)
	testq	%r12, %r12
	je	.LBB1_20

	movq	%r13, %rbx
	cmpq	%r13, %r12
	jae	.LBB1_9

	movabsq	$-3689348814741910323, %rsi
	movq	%r13, %rbx
.LBB1_7:
	movq	%rbx, %rcx
	movq	%rbx, %rax
	mulq	%rsi
	movq	%rdx, %rbx
	shrq	$3, %rbx
	cmpq	%r12, %rbx
	ja	.LBB1_7

	cmpq	$10, %rcx
	jb	.LBB1_11
.LBB1_9:
	movabsq	$-3689348814741910323, %rbp
.LBB1_10:
	xorl	%edx, %edx
	movq	%r12, %rax
	divq	%rbx
	movq	%rax, %rcx
	mulq	%rbp
	shrl	$2, %edx
	andl	$-2, %edx
	leal	(%rdx,%rdx,4), %eax
	subl	%eax, %ecx
	orb	$48, %cl
	movb	%cl, 14(%rsp)
	movl	$1, %edi
	movl	$1, %edx
	leaq	14(%rsp), %rsi
	callq	write
	movq	%rbx, %rax
	mulq	%rbp
	shrq	$3, %rdx
	cmpq	$9, %rbx
	movq	%rdx, %rbx
	ja	.LBB1_10
	jmp	.LBB1_11
.LBB1_20:
	leaq	14(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write
.LBB1_11:
	movb	$10, 14(%rsp)
	leaq	14(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write
	movq	%r14, %rdi
	movq	%r15, %rsi
	callq	power
	movq	%rax, %r14
	leaq	.L.str.3(%rip), %rsi
	movl	$1, %edi
	movl	$9, %edx
	callq	write
	movb	$48, 15(%rsp)
	testq	%r14, %r14
	je	.LBB1_21

	cmpq	%r13, %r14
	jae	.LBB1_16

	movabsq	$-3689348814741910323, %rsi
.LBB1_14:
	movq	%r13, %rcx
	movq	%r13, %rax
	mulq	%rsi
	movq	%rdx, %r13
	shrq	$3, %r13
	cmpq	%r14, %r13
	ja	.LBB1_14

	cmpq	$10, %rcx
	jb	.LBB1_18
.LBB1_16:
	movabsq	$-3689348814741910323, %rbp
	leaq	15(%rsp), %rbx
.LBB1_17:
	xorl	%edx, %edx
	movq	%r14, %rax
	divq	%r13
	movq	%rax, %rcx
	mulq	%rbp
	shrl	$2, %edx
	andl	$-2, %edx
	leal	(%rdx,%rdx,4), %eax
	subl	%eax, %ecx
	orb	$48, %cl
	movb	%cl, 15(%rsp)
	movl	$1, %edi
	movl	$1, %edx
	movq	%rbx, %rsi
	callq	write
	movq	%r13, %rax
	mulq	%rbp
	shrq	$3, %rdx
	cmpq	$9, %r13
	movq	%rdx, %r13
	ja	.LBB1_17
	jmp	.LBB1_18
.LBB1_21:
	leaq	15(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write
.LBB1_18:
	movb	$10, 15(%rsp)
	leaq	15(%rsp), %rsi
	movl	$1, %edi
	movl	$1, %edx
	callq	write
	movq	%fs:40, %rax
	cmpq	16(%rsp), %rax
	jne	.LBB1_19

	xorl	%eax, %eax
	addq	$24, %rsp
	popq	%rbx
	popq	%r12
	popq	%r13
	popq	%r14
	popq	%r15
	popq	%rbp
	retq
.LBB1_19:
	callq	__stack_chk_fail@PLT
############################################################




############################################################
	.section	.rodata
.L.str:
	.asciz	"Enter x: "
.L.str.1:
	.asciz	"Enter y: "
.L.str.2:
	.asciz	"x * y = "
.L.str.3:
	.asciz	"x ** y = "
############################################################
