INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Two Sum', 'Array', 0, 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.', '{"nums = [2,7,11,15], target = 9", "nums = [3,2,4], target = 6","nums = [3,3], target = 6"}', '{"[0,1]", "[1,2]", "[0,1]"}', 'import java.util.HashMap;import java.util.Scanner;import java.util.Map;class Solution {    public int[] twoSum(int[] nums, int target) {        Map<Integer, Integer> numMap = new HashMap<>();        for (int i = 0; i < nums.length; i++) {            int complement = target - nums[i];            if (numMap.containsKey(complement)) {                return new int[] { numMap.get(complement), i };            } else {                numMap.put(nums[i], i);            }        }        return new int[] {};    }}');
INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Palindrome Number', 'Math', 0, 'Given an integer x, return true if x is palindrome integer.An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.', '{"x = 121", "x = -121", "x = 10", "x = -101"}','{"true", "false", "false", "false"}', 'class Solution {    public boolean isPalindrome(int x) {        if (x < 0) {            return false;        } else if (x == 0) {            return true;        } else {            int y = x;            if (y % 10 == 0 ) {                return false;            }            long reversedValue = 0;            while (y != 0) {                long lastDigit = y % 10;                reversedValue = reversedValue * 10 + lastDigit;                y /= 10;            }            if (reversedValue == (long)x) {                return true;            } else {                return false;            }        }    }}');
INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Same Tree', 'Tree', 0, 'Given the roots of two binary trees p and q, write a function to check if they are the same or not.Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.', '{"p = [1,2,3], q = [1,2,3]", "p = [1,2], q = [1,null,2]", "p = [1,2,1], q = [1,1,2]"}', '{"true", "false", "false"}', 'class Solution {    public boolean isSameTree(TreeNode p, TreeNode q) {        if (p == null && q == null) {            return true;        }        if ((p != null && q== null) || (p == null && q != null)) {            return false;        }        int currPValue = p.val;        int currQValue = q.val;        if (currPValue != currQValue) {            return false;        }         else {            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);        }    }}');
INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Plus One', 'Array', 0, 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0''s.Increment the large integer by one and return the resulting array of digits.', '{"digits = [1,2,3]", "digits = [4,3,2,1]", "digits = [0]", "digits = [9]"}','{"[1,2,4]", "[4,3,2,2]", "[1]", "[1,0]"}', 'import java.util.List;import java.util.ArrayList;class Solution {    public int[] plusOne(int[] digits) {       if(digits == null || digits.length == 0){            int[] temp={1};            return temp;        }                int carry=1;        int i;        for( i=digits.length-1;i>=0;i--){            if(digits[i]==9){                digits[i]=0;            }            else{                carry+=digits[i];                digits[i]=carry;                break;            }        }        if(i<0){            int[] result = new int[digits.length+1];            result[0]=1;            return result;        }else            return digits;    }}');
INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Climbing Stairs', 'Dynamic Programming', 0, 'You are climbing a staircase. It takes n steps to reach the top.Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?', '{"n = 2", "n = 3"}','{"2", "3"}', 'class Solution {    public int climbStairs(int n) {        int[] array = new int[n+1];        array[0] = 1;        array[1] = 1;        for (int i = 2; i <= n; i++) {            array[i] = array[i-1] + array[i-2];        }        return array[n];    }}');
INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES('Remove Duplicates from Sorted List', 'Linked List', 0, 'Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.', '{"head = [1,1,2]", "head = [1,1,2,3,3]"}','{"[1,2]", "[1,2,3]"}', 'class Solution {    public ListNode deleteDuplicates(ListNode head) {        ListNode dummy = new ListNode();        ListNode newHead = dummy;        dummy.next = head;        dummy = dummy.next;        if (head == null) {            return head;        }        while(head.next != null) {            ListNode curr = head.next;            if (curr.val == head.val) {                head = curr; //move on to the next element            } else {                dummy.next = curr;                dummy = dummy.next;                head = curr;            }        }        dummy.next = head.next;        return newHead.next;    }}');


