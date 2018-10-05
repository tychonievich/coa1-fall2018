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
	subq	$40, %rsp
	movq	%rdi, %rcx
	testq	%rcx, %rcx
	movl	$32, %r8d
	movl	$32, %esi
	je	.LBB2_5
	xorl	%esi, %esi
	movabsq	$7378697629483820647, %r9
	.align	16, 0x90
.LBB2_2:
	movq	%rcx, %rax
	imulq	%r9
	movq	%rdx, %rax
	shrq	$63, %rax
	sarq	$2, %rdx
	leal	(%rdx,%rax), %edi
	imull	$10, %edi, %r10d
	movl	%ecx, %edi
	subl	%r10d, %edi
	addl	$48, %edi
	movb	%dil, 31(%rsp,%rsi)
	movl	%esi, %edi
	decq	%rsi
	cmpl	$-31, %edi
	je	.LBB2_4
	addq	%rax, %rdx
	addq	$9, %rcx
	cmpq	$18, %rcx
	movq	%rdx, %rcx
	ja	.LBB2_2
.LBB2_4:
	addl	$32, %esi
.LBB2_5:
	movslq	%esi, %rax
	leaq	(%rsp,%rax), %rsi
	subl	%eax, %r8d
	movslq	%r8d, %rdx
	movl	$1, %edi
	callq	write
	addq	$40, %rsp
	ret
############################################################




############################################################
	.globl	main
main:
	pushq	%rbx
	subq	$48, %rsp
	movl	$1, %edi
	movl	$.L.str, %esi
	movl	$4, %edx
	callq	write
	movb	$48, 15(%rsp)
	leaq	15(%rsp), %rbx
.LBB3_1:
	xorl	%edi, %edi
	movl	$1, %edx
	movq	%rbx, %rsi
	callq	read
	cmpb	$10, 15(%rsp)
	jne	.LBB3_1
	movl	$1, %edi
	movl	$.L.str1, %esi
	movl	$4, %edx
	callq	write
	movb	$48, 15(%rsp)
	leaq	15(%rsp), %rbx
.LBB3_3:
	xorl	%edi, %edi
	movl	$1, %edx
	movq	%rbx, %rsi
	callq	read
	cmpb	$10, 15(%rsp)
	jne	.LBB3_3
	movl	$1, %edi
	movl	$.L.str2, %esi
	movl	$10, %edx
	callq	write
	leaq	48(%rsp), %rbx
	movl	$1, %edi
	xorl	%edx, %edx
	movq	%rbx, %rsi
	callq	write
	movl	$1, %edi
	movl	$.L.str3, %esi
	movl	$1, %edx
	callq	write
	movl	$1, %edi
	movl	$.L.str4, %esi
	movl	$8, %edx
	callq	write
	movl	$1, %edi
	xorl	%edx, %edx
	movq	%rbx, %rsi
	callq	write
	movl	$1, %edi
	movl	$.L.str3, %esi
	movl	$1, %edx
	callq	write
	xorl	%eax, %eax
	addq	$48, %rsp
	popq	%rbx
	ret
############################################################




############################################################
	.section	.rodata
.L.str:
	.asciz	"x = "

.L.str1:
	.asciz	"y = "

.L.str2:
	.asciz	"product = "

.L.str3:
	.asciz	"\n"

.L.str4:
	.asciz	"power = "
############################################################

